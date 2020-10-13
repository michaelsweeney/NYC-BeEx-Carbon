import React, { useEffect, useState, useRef } from 'react';

import { formatInt } from './numformat.js';
import { CarbonBar } from './charts/carbonbar.js';

const CarbonLimitContainer = props => {
	const container = useRef(null);
	const { summary } = props.building;

	useEffect(() => {
		normalizeRects();
	});

	const normalizeRects = () => {
		let rectswidth = 0;
		container.current.querySelectorAll('.carbon-summary-text').forEach(node => {
			rectswidth = Math.max(rectswidth, node.getBoundingClientRect().width);
		});

		if (rectswidth != 0) {
			container.current.querySelectorAll('.carbon-summary-text').forEach(node => {
				node.setAttribute('width', rectswidth);
			});
		}
	};

	let carbondata = {
		total_carbon: summary.total_carbon,
		total_area: summary.total_area,
		co2limit_2024: summary.co2limit_2024,
		co2limit_2030: summary.co2limit_2030,
		co2limit_2035: summary.co2limit_2035,
		fine_2024: summary.fine_2024,
		fine_2030: summary.fine_2030,
		fine_2035: summary.fine_2035,
	};

	carbondata['carbon_norm'] = carbondata.total_carbon / carbondata.total_area;

	return (
		<div className="carbon-main-container">
			<div className="container-header">Estimated Carbon Summary</div>
			<div ref={container} className="carbon-summary-card">
				<div className="summary-container summary-container-top">
					<div className="carbon-summary-val">{formatInt(carbondata.total_carbon)}</div>
					<div className="carbon-summary-text">tCO2e/yr</div>
				</div>
				<div className="summary-container summary-container-bottom">
					<div className="carbon-summary-val">{formatInt(carbondata.carbon_norm)}</div>
					<div className="carbon-summary-text">tCO2/sf/yr</div>
				</div>
			</div>
			<CarbonBar carbondata={carbondata}></CarbonBar>
		</div>
	);
};

export { CarbonLimitContainer };
