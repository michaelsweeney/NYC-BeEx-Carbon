import React, { useEffect, useRef } from 'react';

import { nest, select, selectAll, pie, arc, interpolateObject, interpolate, event, rgb } from 'd3';

import { formatInt } from '../numformat.js';

const DonutChart = props => {
	const container = useRef(null);

	useEffect(() => {
		createDonutChart({});
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	const handleResize = () => {
		createDonutChart({});
	};

	const createDonutChart = params => {
		const node = container.current;
		let data = props.donutprops;
		let title = props.title;
		let tag = props.tag;

		let divdims = node.parentElement.parentElement.getBoundingClientRect();
		let divheightoffset = 65;
		let divwidthoffset = 40;

		// definitions and setup
		let myDuration = 600;
		let firstTime = true;

		let width = (divdims.width - divwidthoffset) / 3;
		let height = divdims.height - divheightoffset;

		let margintop = Math.max(height * 0.01, 10);
		let marginbottom = Math.max(height * 0.05, 40);

		margintop = 0;

		let piewidth = width;
		let pieheight = height - margintop - marginbottom;

		let margin = Math.max(height * 0.05, 10);
		let radius = Math.min(piewidth, pieheight) / 2;

		let colorlookups = {
			Electricity: '#358FB4',
			Gas: '#6EB12C',
			Steam: '#B23232',
			'Fuel Two': '#A644E2',
			'Fuel Four': '#62009E',
		};

		let unitlookup = {
			cost: {
				val: '$',
				val_norm: '$/sf/yr',
			},
			energy: {
				val: 'kBtu',
				val_norm: 'kBtu/sf/yr',
			},
			carbon: {
				val: 'tCO2e',
				val_norm: 'tCO2e/sf/yr',
			},
		};

		let piefunc = pie()
			.value(function(d) {
				return d.val;
			})
			.sort(null);

		let arcfunc = arc()
			.innerRadius((radius - margin) * 0.7)
			.outerRadius(radius - margin);

		//  build container
		let svg = select(node)
			.selectAll('svg')
			.data([0])
			.join('svg')
			.attr('width', width)
			.attr('height', height);

		let g = svg
			.selectAll('g')
			.data([0])
			.join('g')
			.attr('transform', `translate(${width / 2}, ${pieheight / 2 + margintop})`);

		// get totals
		let total_abs = 0;
		let total_norm = 0;
		data.forEach(d => {
			total_abs += d.val;
			total_norm += d.val_norm;
		});

		// add title
		let titletext = svg
			.selectAll('.titletext')
			.data([0])
			.join('text')
			.text(title)
			.attr('class', 'titletext')
			.attr('x', width / 2)
			.attr('y', pieheight / 2 + margintop)
			.attr('font-size', 14)
			.attr('fill', () => {
				if (formatInt(total_abs) != 0) {
					return 'black';
				}
				return 'gray';
			})
			.attr('text-anchor', 'middle')
			.style('font-family', 'CircularStd-Bold');

		// add summary text

		let summarytext = svg
			.selectAll('.summarytext')
			.data([total_abs, total_norm])
			.join('text')
			.text((d, i) => {
				if (formatInt(total_abs) == 0) {
					return '';
				}
				if (tag == 'cost') {
					if (i == 0) {
						return `$${formatInt(d)}`;
					}
					if (i == 1) {
						let val = d || 0;
						return `$${formatInt(val)}/sf/yr`;
					}
				} else {
					if (i == 0) {
						return `${formatInt(d)} ${unitlookup[tag].val} `;
					}
					if (i == 1) {
						let val = d || 0;
						return `${formatInt(val)} ${unitlookup[tag].val_norm}`;
					}
				}
			})
			.attr('class', 'summarytext')
			.attr('x', width / 2)
			.attr('y', (d, i) => pieheight + margintop + i * 16 + 10)
			.attr('fill', 'black')
			.attr('text-anchor', 'middle');

		// add tip
		let tooltipdiv = select(node)
			.selectAll('.tooltip.tooltip-donut')
			.data([0])
			.join('div')
			.attr('class', 'tooltip tooltip-donut')
			.style('opacity', 0);

		// format data -- can easily refactor this because nesting is not particularly valuable.
		let path = g.selectAll('path');

		let nesteddata = nest()
			.key(function(d) {
				return d;
			})
			.entries(data)
			.reverse();
		let data0 = path.data();
		let data1 = piefunc(nesteddata[0].values);

		// handle paths and tweening
		path = path.data(data1, key);
		path.transition()
			.duration(myDuration)
			.attrTween('d', arcTween);
		path.enter()
			.append('path')
			.each(function(d, i) {
				let narc = findNeighborArc(i, data0, data1, key);
				if (narc) {
					this._current = narc;
					this._previous = narc;
				} else {
					this._current = d;
				}
			})
			.attr('fill', function(d, i) {
				return colorlookups[d.data.utility];
			})
			.on('mouseover', function(d) {
				tooltipdiv
					.transition()
					.duration(200)
					.style('opacity', 0.9);

				tooltipdiv
					.html(
						`
          <span class = 'tip-header'>${d.data.utility}</span>
          <br/>
          ${tag == 'cost' ? `$${formatInt(d.data.val)}` : `${formatInt(d.data.val)} ${unitlookup[tag].val}`}
          <br/>
          ${
				tag == 'cost'
					? `$${formatInt(d.data.val_norm)}/sf/yr`
					: `${formatInt(d.data.val_norm)} ${unitlookup[tag].val_norm}`
			}
            `
					)
					.style('left', () => {
						return event.pageX - 100;
					})
					.style('top', event.pageY - 100 + 'px');

				select(this)
					.transition()
					.duration(200)
					.style('fill', function(d, i) {
						return rgb(colorlookups[d.data.utility]).darker();
					});
			})
			.on('mouseout', function(d) {
				tooltipdiv
					.transition()
					.duration(500)
					.style('opacity', 0);

				select(this)
					.transition()
					.duration(200)
					.style('fill', function(d, i) {
						return colorlookups[d.data.utility];
					});
			})
			.transition()
			.duration(myDuration)
			.attrTween('d', arcTween);

		path.exit()
			.transition()
			.duration(myDuration)
			.attrTween('d', function(d, index) {
				let currentIndex = this._previous.data.utility;
				let i = interpolateObject(d, this._previous);
				return function(t) {
					return arcfunc(i(t));
				};
			})
			.remove();
		firstTime = false;

		// internal functions
		function key(d) {
			return d.data.utility;
		}

		function findNeighborArc(i, data0, data1, key) {
			let d;

			if ((d = findPreceding(i, data0, data1, key))) {
				let obj = Object.assign({}, d);
				obj.startAngle = d.endAngle;
				return obj;
			} else if ((d = findFollowing(i, data0, data1, key))) {
				let obj = Object.assign({}, d);
				obj.endAngle = d.startAngle;
				return obj;
			}
			return null;
		}

		// Find the element in data0 that joins the highest preceding element in data1.
		function findPreceding(i, data0, data1, key) {
			let m = data0.length;
			while (--i >= 0) {
				let k = key(data1[i]);
				for (let j = 0; j < m; ++j) {
					if (key(data0[j]) === k) return data0[j];
				}
			}
		}

		// Find the element in data0 that joins the lowest following element in data1.
		function findFollowing(i, data0, data1, key) {
			let n = data1.length,
				m = data0.length;
			while (++i < n) {
				let k = key(data1[i]);
				for (let j = 0; j < m; ++j) {
					if (key(data0[j]) === k) return data0[j];
				}
			}
		}

		function arcTween(d) {
			let i = interpolate(this._current, d);
			this._current = i(0);
			return function(t) {
				return arcfunc(i(t));
			};
		}
	};

	return <div className="donut-container" ref={container}></div>;
};

export { DonutChart };
