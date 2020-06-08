import React from 'react';
import { stack, max, scaleLinear, axisLeft, axisBottom, select, scaleBand, selectAll, event, rgb } from 'd3';
import { formatInt } from '../numformat.js';

class BarChart extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.createBarChart({});
		this.addResize();
	}
	addResize() {
		window.addEventListener('resize', () => {
			this.createBarChart({ ignoretransition: true });
		});
	}
	componentDidUpdate() {
		this.createBarChart({});
	}
	createBarChart = params => {
		// parse data
		let { total_cost, fine_2024, fine_2030, fine_2035 } = this.props.barprops;

		let datatostack = [
			{ period: '2024-2029', utility: total_cost, fine: fine_2024, util_and_fine: fine_2024 + total_cost },
			{ period: '2030-2034', utility: total_cost, fine: fine_2030, util_and_fine: fine_2030 + total_cost },
			{ period: '2035+', utility: total_cost, fine: fine_2035, util_and_fine: fine_2035 + total_cost },
		];

		let colors = { fine: '#333333', utility: '#BAD636' };
		let keys = ['utility', 'fine'];

		let data = stack().keys(keys)(datatostack);
		let xmax = 0;
		data.forEach(d => {
			d.forEach(s => {
				xmax = max([xmax, s[0], s[1]]);
			});
		});

		// parent container sizing
		let divheightoffset = 0;
		let divwidthoffset = 28;
		let divdims = this.container.parentElement.getBoundingClientRect();

		let duration = 500;

		if (params.ignoretransition) {
			duration = 0;
		}
		let width = divdims.width - divwidthoffset;
		let height = divdims.height - divheightoffset;

		let legendtoppad = 30;
		let margins = {
			t: 20,
			b: 80,
			r: 80,
			l: 75,
		};

		let plotwidth = width - margins.l - margins.r;
		let plotheight = height - margins.t - margins.b;
		let barwidth = plotheight / 6;

		let svg = select(this.container)
			.selectAll('svg')
			.data([0])
			.join('svg')
			.attr('width', width)
			.attr('height', height);

		let yScale = scaleBand()
			.domain(['2024-2029', '2030-2034', '2035+'])
			.rangeRound([0, plotheight]);

		let xScale = scaleLinear()
			.domain([xmax, 0])
			.range([plotwidth, 0]);

		let xAxis = axisBottom()
			.scale(xScale)
			.ticks(5);

		let yAxis = axisLeft()
			.scale(yScale)
			.ticks(3)
			.tickSize(0)
			.tickSizeOuter(0);

		let tooltipdiv = select(this.container)
			.selectAll('.tooltip.tooltip-cost')
			.data([0])
			.join('div')
			.attr('class', 'tooltip tooltip-cost')
			.style('opacity', 0);

		let groups = svg
			.selectAll('.bar')
			.data(data, d => d.key)
			.join('g')
			.attr('class', d => `bar bar-${d.key}`)
			.attr(`transform`, `translate(${margins.l}, ${margins.t})`)
			.style('fill', (d, i) => {
				return colors[d.key];
			});
		let rects = groups
			.selectAll('rect')
			.data(d => {
				return d;
			})
			.join('rect')
			.attr('class', d => `rect-${d.data.period.replace('+', '')}`)
			.attr('y', (d, i) => {
				return yScale(d.data.period) + barwidth / 2;
			})
			.on('mouseover', function(d) {
				tooltipdiv
					.transition()
					.duration(200)
					.style('opacity', 0.9);

				if (d.data.period == '2035+') {
					tooltipdiv.html(`
                    <div class = 'tip-header'><u>${d.data.period}</u></div>
                    <div>Utility Cost: $${formatInt(d.data.utility) + '/yr'}</div>
                    <div>Carbon Penalty: $${formatInt(d.data.fine) + '/yr'}</div>
                    <div>Total Cost: $${formatInt(d.data.util_and_fine) + '/yr'}</div> 
                    <p class='fine-print'>
                        <i>
                            *Penalties for 2035 and up<br/>
                            are highly variable and will <br/>
                            likely change. Value shown <br/>
                            for this period is only an <br/>
                            estimate.
                        </i>
                    </p>
                    `);
				} else {
					tooltipdiv.html(`
                    <div class = 'tip-header'><u>${d.data.period}</u></div>
                    <div>Utility Cost: $${formatInt(d.data.utility) + '/yr'}</div>
                    <div>Carbon Penalty: $${formatInt(d.data.fine) + '/yr'}</div>
                    <div>Total Cost: $${formatInt(d.data.util_and_fine) + '/yr'}</div> 
                    `);
				}
				tooltipdiv
					.style('left', () => {
						return event.pageX - 100;
					})
					.style('top', event.pageY - 300 + 'px');
				select(this)
					.transition()
					.duration(200)
					.style('fill', (d, i) => {
						return rgb(select(this).style('fill')).darker();
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
						return colors[d.key];
					});
			})
			.transition()
			.duration(duration)
			.attr('x', d => {
				return xScale(d[0]);
			})
			.attr('width', d => {
				return xScale(d[1]) - xScale(d[0]);
			})
			.attr('height', barwidth);

		svg.selectAll('.x-axis')
			.data([0])
			.join('g')
			.attr('class', 'x-axis')
			.attr('transform', `translate(${margins.l}, ${plotheight + margins.t})`);

		svg.selectAll('.y-axis')
			.data([0])
			.join('g')
			.attr('class', 'y-axis')
			.attr('transform', `translate(${margins.l}, ${margins.t + barwidth / 7})`);

		svg.select('.y-axis').call(yAxis);

		svg.selectAll('.y-axis')
			.selectAll('text')
			.attr('x', -6);

		let labels = svg
			.selectAll('.label')
			.data(datatostack, d => d.period)
			.join('text')
			.attr(`transform`, `translate(${margins.l}, ${margins.t})`)
			.attr('class', 'label')
			.attr('text-anchor', 'start')
			.transition()
			.duration(duration)
			.attr('x', d => {
				return xScale(d.util_and_fine) + 5;
			})
			.attr('y', d => {
				return yScale(d.period) + barwidth + 4;
			})
			.text(d => {
				if (d.util_and_fine == 0) {
					return '';
				}
				return '$' + formatInt(d.util_and_fine) + '/yr';
			});

		// Draw legend
		let legend = svg
			.selectAll('.legend')
			.data([0])
			.join('g')
			.attr('class', 'legend')
			.join('g')
			.attr('class', 'legend')
			.attr('transform', `translate(${margins.l}, ${margins.t + plotheight + legendtoppad})`);

		legend
			.selectAll('rect')
			.data(Object.keys(colors))
			.join('rect')
			.attr('x', (d, i) => {
				return i * 180 + 5;
			})
			.attr('y', 0)
			.attr('width', 15)
			.attr('height', 15)
			.style('fill', (d, i) => {
				return colors[d];
			})
			.style('opacity', 1);

		legend
			.selectAll('text')
			.data(Object.keys(colors))
			.join('text')
			.attr('x', (d, i) => {
				return i * 180 + 30;
			})
			.attr('y', 12)
			.attr('font-size', 14)
			.attr('class', 'legend-text')
			.style('text-anchor', 'start')
			.style('opacity', 1)
			.text((d, i) => {
				switch (d) {
					case 'utility':
						return 'Utility Cost ($)';
					case 'fine':
						return 'Estimated Penalty ($)';
				}
			});

		// lighten 2035 fine rects
		svg.selectAll('.rect-2035').style('opacity', (d, i) => {
			if (i == 1 || i == 0) {
				return 0.35;
			}
		});

		// reposition legend

		let legenddims = legend.node().getBoundingClientRect();
		let legendwidth = legenddims.width;
		let legendheight = legenddims.height;

		legend.attr(
			'transform',
			`translate(${margins.l + (plotwidth - legendwidth) / 2}, ${margins.t + plotheight + legendtoppad})`
		);

		if (total_cost == 0) {
			select(legend.selectAll('text').nodes()[1]).style('opacity', 0.5);
			select(legend.selectAll('rect').nodes()[1]).style('opacity', 0.5);
		}
		if (fine_2024 == 0) {
			select(legend.selectAll('text').nodes()[0]).style('opacity', 0.5);
			select(legend.selectAll('rect').nodes()[0]).style('opacity', 0.5);
		}
	};

	render() {
		return <div className="bar-container" ref={container => (this.container = container)}></div>;
	}
}

export { BarChart };
