import React from 'react';

import { BarChart } from './charts/barchart.js';

const AnnualCostSummaryContainer = props => {
	let { total_cost, fine_2024, fine_2030, fine_2035 } = props.building.summary;

	let barprops = {
		total_cost: total_cost,
		fine_2024: fine_2024,
		fine_2030: fine_2030,
		fine_2035: fine_2035,
	};

	return (
		<React.Fragment>
			<div className="container-header">Estimated Annual Cost Summary</div>
			<BarChart barprops={barprops}></BarChart>
		</React.Fragment>
	);
};

export { AnnualCostSummaryContainer };
