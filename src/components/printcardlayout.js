import React from 'react';
import { AnnualCostSummaryContainer } from './annualcostsummarycontainer.js';
import { CarbonLimitContainer } from './carbonlimitcontainer.js';
import { BuildingMetricContainer } from './buildingmetriccontainer.js';

const PrintCardLayout = props => {
	let { building } = props;
	return (
		<div className="print-content-layout">
			<div className="print-top-row">
				<div className="carbon-bar-card-container">
					<CarbonLimitContainer building={building}></CarbonLimitContainer>
				</div>
			</div>
			<div className="print-bottom-row">
				<div className="print-left-bottom cost-card">
					<AnnualCostSummaryContainer building={building}></AnnualCostSummaryContainer>
				</div>
				<div className="print-right-bottom donut-card">
					<BuildingMetricContainer building={building}></BuildingMetricContainer>
				</div>
			</div>
		</div>
	);
};

export { PrintCardLayout };
