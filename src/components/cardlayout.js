import React from 'react';
import { AnnualCostSummaryContainer } from './annualcostsummarycontainer.js';
import { CarbonLimitContainer } from './carbonlimitcontainer.js';
import { BuildingMetricContainer } from './buildingmetriccontainer.js';

const CardLayout = props => {
	let { building } = props;
	return (
		<div className="content-layout">
			<div className="top-row">
				<CarbonLimitContainer building={building}></CarbonLimitContainer>
			</div>
			<div className="bottom-row">
				<div className="left-bottom cost-card">
					<AnnualCostSummaryContainer building={building}></AnnualCostSummaryContainer>
				</div>
				<div className="right-bottom donut-card">
					<BuildingMetricContainer building={building}></BuildingMetricContainer>
				</div>
			</div>
		</div>
	);
};

export { CardLayout };
