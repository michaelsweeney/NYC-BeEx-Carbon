import React, { useEffect, useRef } from 'react';

import { select } from 'd3';

const DonutLegend = props => {
	const container = useRef(null);

	const { legendprops } = props;

	useEffect(() => {
		createLegend();
		window.addEventListener('resize', createLegend);
		return () => window.removeEventListener('resize', createLegend);
	});

	const createLegend = () => {
		const node = container.current;
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

		legendprops.forEach(e => {
			if (e.val != 0) {
				legendobj[e.utility] = {
					color: colorlookups[e.utility],
					textwidth: widthlookups[e.utility],
				};
			}
		});
		let divdims = node.parentElement.parentElement.getBoundingClientRect();

		let width = divdims.width;
		let height = divdims.height;

		let svg = select(node)
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
	};

	return <div className="donut-legend-container" ref={container}></div>;
};

export { DonutLegend };
