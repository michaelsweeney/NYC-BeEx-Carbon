import React from 'react';

import { select } from 'd3';

class DonutLegend extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.createLegend();
		this.addResize();
	}
	componentDidUpdate() {
		this.createLegend();
	}

	addResize() {
		window.addEventListener('resize', () => {
			this.createLegend();
		});
	}
	createLegend() {
		let colorlookups = {
			Electricity: '#358FB4',
			Gas: '#6EB12C',
			Steam: '#B23232',
			'Fuel Two': '#A644E2',
			'Fuel Four': '#62009E',
		};

		let widthlookups = {
			Electricity: 64,
			Gas: 25,
			Steam: 40,
			'Fuel Two': 56,
			'Fuel Four': 57,
		};

		let legendobj = {};

		this.props.legendprops.forEach(e => {
			if (e.val != 0) {
				legendobj[e.utility] = {
					color: colorlookups[e.utility],
					textwidth: widthlookups[e.utility],
				};
			}
		});
		let divdims = this.container.parentElement.parentElement.getBoundingClientRect();

		let width = divdims.width;
		let height = divdims.height;

		let svg = select(this.container)
			.selectAll('svg')
			.data([0])
			.join('svg');
		svg.attr('width', width).attr('height', height);

		let g = svg
			.selectAll('g')
			.data([0])
			.join('g');
		g.attr('transform', `translate(0,10)`);

		let rects = g
			.selectAll('rect')
			.data(Object.keys(legendobj))
			.join('rect');

		let nextrectposition = 0;
		let rectpadding = 35;
		let textpadding = 35;

		rects
			.attr('fill', (d, i) => legendobj[d].color)
			.attr('x', (d, i) => {
				let currentposition = nextrectposition;
				nextrectposition += legendobj[d].textwidth + rectpadding;
				return currentposition;
			})
			.attr('y', (d, i) => {
				return 0;
			})
			.attr('width', 15)
			.attr('height', 15);
		let text = g
			.selectAll('text')
			.data(Object.keys(legendobj))
			.join('text');

		let nexttextposition = 0;
		text.text(d => d)
			.attr('x', (d, i) => {
				let currentposition = nexttextposition;
				nexttextposition += legendobj[d].textwidth + textpadding;
				return currentposition + 22;
			})
			.attr('y', (d, i) => {
				return 12;
			})
			.attr('font-size', 14);

		let computedwidth = g.node().getBBox().width;

		g.attr('transform', `translate(${(width - computedwidth - 20) / 2}, 10)`);
	}

	render() {
		return <div className="donut-legend-container" ref={container => (this.container = container)}></div>;
	}
}

export { DonutLegend };
