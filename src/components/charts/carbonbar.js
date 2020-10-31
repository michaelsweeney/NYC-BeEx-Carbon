import React, { useEffect, useRef } from 'react';

import { max, scaleLinear, select, selectAll, event, rgb, axisLeft, axisBottom } from 'd3';
import { formatInt } from '../numformat.js';

const CarbonBar = props => {
	const container = useRef(null);

	useEffect(() => {
		createBarChart({});
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	const handleResize = () => {
		createBarChart({ ignoretransition: true });
	};

	const createBarChart = params => {
		const node = container.current;
		// parse data
		let {
			total_carbon,
			co2limit_2024,
			co2limit_2030,
			co2limit_2035,
			fine_2024,
			fine_2030,
			fine_2035,
		} = props.carbondata;

		let divheightoffset = 0;
		let divwidthoffset = 28;
		let divdims = node.getBoundingClientRect();

		let duration = 500;
		if (params.ignoretransition) {
			duration = 0;
		}

		let width = divdims.width - divwidthoffset;
		let height = divdims.height - divheightoffset;

		let barthickness = height / 6 / 1.5;

		let barmargins = {
			t: Math.max(height * 0.4, 100),
			b: 35 + height * 0.025,
			r: 100,
			l: 20,
		};

		let threshmargins = {
			t: 5,
			l: 20,
			r: 20,
		};

		let plotwidth = width - barmargins.l - barmargins.r;
		let plotheight = height - barmargins.t - barmargins.b;

		let threshwidth = width - threshmargins.l - threshmargins.r;

		let threshspacing = threshwidth / 3;

		let linedata = [
			{
				thresh: co2limit_2035,
				fine: fine_2035,
				key: '2035+',
			},
			{
				thresh: co2limit_2030,
				fine: fine_2030,
				key: '2030-2034',
			},
			{
				thresh: co2limit_2024,
				fine: fine_2024,
				key: '2024-2029',
			},
		];

		let containercolor = '#595954';
		let barcolor = '#C4C4C4';
		let barcolor_nofine = '#999999';
		let containerheight = 60;
		let containerwidth = 270;

		let tooltipdiv = select(node)
			.selectAll('.tooltip.tooltip-carbon-bar')
			.data([0])
			.join('div')
			.attr('class', 'tooltip tooltip-carbon-bar')
			.style('opacity', 0);

		let xScale = scaleLinear()
			.domain([0, max([co2limit_2024, total_carbon])])
			.range([0, plotwidth]);

		let yScale = scaleLinear()
			.domain([1, 0])
			.range([-5, barthickness + 5]);

		let svg = select(node)
			.selectAll('svg')
			.data([0])
			.join('svg')
			.attr('width', width)
			.attr('height', height);

		let barg = svg
			.selectAll('g')
			.data([0])
			.join('g')
			.attr('class', 'bar-g')
			.attr('width', plotwidth)
			.attr('height', plotheight)
			.attr('transform', `translate(${barmargins.l}, ${barmargins.t})`);

		let xAxis = axisBottom(xScale)
			.ticks(5)
			.tickSizeOuter(0);
		let yAxis = axisLeft(yScale).tickSizeOuter(0);

		let xaxisg = svg
			.selectAll('.x-axis')
			.data([0])
			.join('g')
			.attr('class', 'x-axis')
			.attr('transform', `translate(${barmargins.l}, ${barmargins.b + barthickness + barmargins.t})`);

		let yaxisg = svg
			.selectAll('.y-axis')
			.data([0])
			.join('g')
			.attr('class', 'y-axis')
			.attr('transform', `translate(${barmargins.l}, ${barmargins.t + barthickness})`)
			.call(yAxis);

		svg.selectAll('.axis-title')
			.data([0])
			.join('text')
			.attr('class', 'axis-title')
			.text(() => (total_carbon != 0 ? 'Tons CO2 per year' : ''))
			.attr('x', barmargins.l + plotwidth / 2)
			.attr('y', barmargins.b + barmargins.t + barthickness + 40 + height * 0.05);

		// create threshold containers
		let threshcontainer = svg
			.selectAll('.thresh-main-container')
			.data([0])
			.join('g')
			.attr('class', 'thresh-container')
			.attr('transform', `translate(${threshmargins.l}, ${threshmargins.t})`);

		let subcontainers = threshcontainer
			.selectAll('.sub-container')
			.data(linedata)
			.join('g')
			.attr('class', d => `sub-container ${d.fine == 0 ? 'no-fine' : 'fine'}`)
			.each(fineContainer);

		function fineContainer(d, i) {
			let g = select(this)
				.selectAll('group')
				.data([0])
				.join('g')
				.attr('transform', `translate(${i * threshspacing},0)`);

			g.selectAll('.rect-container')
				.data([d])
				.join('rect')
				.attr('class', 'rect-container')
				.attr('width', containerwidth) // starting width only
				.attr('height', containerheight)
				.attr('rx', 8)
				.attr('fill', d => {
					if (d.fine == 0) {
						return barcolor_nofine;
					} else {
						return containercolor;
					}
				});

			g.selectAll('.year-text')
				.data([0])
				.join('text')
				.attr('class', 'carbon-summary-text top-text')
				.attr('x', 10)
				.attr('y', 20)
				.text(d.key);

			g.selectAll('.fine-text')
				.data([0])
				.join('text')
				.attr('class', 'carbon-summary-text fine-text')
				.attr('x', 10)
				.attr('y', 35)
				.text(`Threshold: ${formatInt(d.thresh)} tCO2e/yr`);

			g.selectAll('.thresh-text')
				.data([0])
				.join('text')
				.attr('class', 'carbon-summary-text thresh-text')
				.attr('x', 10)
				.attr('y', 50)
				.text(`Est. Penalty: $${formatInt(d.fine) + '/yr'}`);

			let textwidths = [];
			g.selectAll('text')
				.nodes()
				.forEach(node => {
					textwidths.push(node.getBBox().width);
				});
			let maxwidth = max(textwidths);
			g.select('.rect-container').attr('width', () => maxwidth + 40);
		}

		let bar = barg
			.selectAll('rect')
			.data([total_carbon])
			.join('rect')
			.on('mouseover', function(d) {
				tooltipdiv
					.transition()
					.duration(200)
					.style('opacity', 0.9);

				tooltipdiv
					.html(
						`
                <div>${formatInt(total_carbon)} tCO2e/yr</div>
                `
					)

					.style('left', () => {
						return event.pageX - 100;
					})
					.style('top', event.pageY - 100 + 'px');

				select(this)
					.transition()
					.duration(200)
					.attr('fill', function(d, i) {
						return rgb(barcolor).darker();
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
					.attr('fill', function(d, i) {
						return barcolor;
					});
			})
			.transition()
			.duration(duration)
			.attr('y', barthickness)
			.attr('height', barthickness)
			.attr('fill', barcolor)
			.attr('x', 0)
			.attr('width', d => {
				return xScale(total_carbon);
			});

		function getRectWidths(g, selector) {
			return g
				.selectAll(selector)
				.nodes()
				.map(el => el.getAttribute('width'));
		}

		let [width_2024, width_2030, width_2035] = getRectWidths(threshcontainer, '.rect-container');
		linedata[0].rectwidth = width_2035;
		linedata[1].rectwidth = width_2030;
		linedata[2].rectwidth = width_2024;

		// updates for dimension changes
		if (height < 220) {
			xaxisg.call(xAxis);
			svg.selectAll('.axis-title').remove();
		} else {
			xaxisg.call(xAxis);
			try {
				svg.selectAll('.tick')
					.nodes()[0]
					.remove();
			} catch {}
		}
		// polylines linked to rects
		let imap = {
			0: 3,
			1: 2,
			2: 1,
		};
		let polylines = barg
			.selectAll('polyline')
			.data(linedata, d => d.key)
			.join('polyline');
		polylines
			.attr('stroke', 'black')
			.attr('stroke-width', '1px')
			.attr('fill', 'none')
			.transition()
			.duration(duration)
			.attr('points', (d, i) => {
				if (d.thresh > total_carbon * 2) {
					return '';
				}
				if (d.thresh == 0 && total_carbon == 0) {
					return '';
				}
				return `
                        ${xScale(d.thresh)}, ${barthickness * 2}
                        ${xScale(d.thresh)}, ${20 - 15 * imap[i]}
                        ${i * threshspacing + d.rectwidth / 2}, ${20 - 15 * imap[i]}
                        ${i * threshspacing + d.rectwidth / 2}, ${-(barmargins.t - threshmargins.t - containerheight)}
                        `;
			});

		// remove if nothing entered
		if (total_carbon == 0) {
			yaxisg.remove();
			xaxisg.remove();
			barg.remove();
		}

		// remove y axis components
		xaxisg.selectAll('.domain').remove();
		yaxisg.selectAll('.tick').remove();
	};

	return <div className="carbon-bar-card" ref={container}></div>;
};

export { CarbonBar };
