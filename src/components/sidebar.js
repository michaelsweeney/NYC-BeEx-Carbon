import React from 'react';

import { conn } from '../store/connect';
import UtilityInput from './utilityinput.js';
import BuildingType from './buildingtype.js';

const Sidebar = props => {
	const { inputs, isDefaultRates } = props;

	const setDefaultRates = () => {
		if (isDefaultRates) {
			props.actions.setIsDefaultRates(false);
			props.actions.useNullRates();
		} else {
			props.actions.setIsDefaultRates(true);
			props.actions.useDefaultRates();
		}
	};

	const addBuildingType = () => {
		let state = Object.assign({}, inputs);
		let numtypes = Object.keys(state.types).length;
		let nextid = numtypes + 1;

		while (nextid in state.types) {
			nextid++;
		}

		state.types[nextid] = {
			type: 'A',
			area: 0,
			id: nextid,
		};
		props.actions.setBuilding(state);
	};

	return (
		<div className="sidebar">
			{/* ----- BUILDING TYPE INPUTS ------ */}

			<div className="head-text-2">Building Inputs</div>

			<div className="bldg-input-main-container">
				<div className="input-header-type head-text-4">
					Building Type
					<a
						href="https://up.codes/viewer/new_york_city/nyc-building-code-2014/chapter/3/use-and-occupancy-classification#3"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span style={{ marginLeft: '5px', paddingTop: '5px' }}>?</span>
					</a>
				</div>
				<div className="input-header-area head-text-4">Area (SF)</div>

				{Object.keys(inputs.types).map(id => {
					let { type, area } = inputs.types[id];
					return (
						<React.Fragment key={id}>
							<BuildingType bldgtype={type} area={area} typenum={id}></BuildingType>
						</React.Fragment>
					);
				})}

				<div className="add-building-type">
					<button onClick={addBuildingType}>+</button>
					<div>Add Building Type</div>
				</div>
			</div>

			{/* ----- UTILITY INPUTS ------ */}

			<div className="head-text-2">Utility Inputs</div>
			<div className="default-rate-checkbox head-text-4">
				<input type="checkbox" checked={isDefaultRates} onChange={setDefaultRates} />
				<div className="head-text-4">Use Default Rates</div>
			</div>
			<div className="utility-input-main-container">
				<UtilityInput title="Electricity" cons_title="kWh" utiltag="elec" cost_title="$/kWh" />
				<UtilityInput title="Natural Gas" cons_title="therms" utiltag="gas" cost_title="$/therm" />
				<UtilityInput title="Steam" cons_title="mLbs" utiltag="steam" cost_title="$/mLb" />
				<UtilityInput title="Fuel Oil 2" cons_title="gal" utiltag="fuel_two" cost_title="$/gal" />
				<UtilityInput title="Fuel Oil 4" cons_title="gal" utiltag="fuel_four" cost_title="$/gal" />
			</div>
		</div>
	);
};
const mapStateToProps = state => {
	return {
		inputs: state.building.inputs,
		isDefaultRates: state.building.isDefaultRates,
	};
};

export default conn(mapStateToProps)(Sidebar);
