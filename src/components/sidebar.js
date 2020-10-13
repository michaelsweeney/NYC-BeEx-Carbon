import React, { useState, useEffect } from 'react';
import { UtilityInput } from './utilityinput.js';
import { BuildingType } from './buildingtype.js';

const Sidebar = props => {
	const { inputCallback, buildingInputs } = props;

	const useDefaultRates = e => {
		if (e.target.checked) {
			let state = Object.assign({}, buildingInputs);
			state.utilities.elec.rate = '0.22';
			state.utilities.gas.rate = '0.997';
			state.utilities.steam.rate = '35';
			state.utilities.fuel_two.rate = '1.65';
			state.utilities.fuel_four.rate = '1.65';
			// setBldg(state);
			inputCallback(state);
		} else {
			let state = Object.assign({}, buildingInputs);
			state.utilities.elec.rate = '';
			state.utilities.gas.rate = '';
			state.utilities.steam.rate = '';
			state.utilities.fuel_two.rate = '';
			state.utilities.fuel_four.rate = '';
			inputCallback(state);
		}
	};

	const handleUtilityChange = e => {
		console.log('utility change');
		let value = e.target.value;
		let [fuel, type] = e.target.getAttribute('datatag').split('-');
		let state = Object.assign({}, buildingInputs);
		state.utilities[fuel][type] = value;
		inputCallback(state);
	};

	const handleUtilityBlur = e => {
		console.log('utility blur');
		let value = e.target.value;
		let [fuel, type] = e.target.getAttribute('datatag').split('-');
		let state = Object.assign({}, buildingInputs);
		state.utilities[fuel][type] = value;
		inputCallback(state);
	};

	const handleBuildingTypeChange = e => {
		let state = Object.assign({}, buildingInputs);
		let value = e.target.value;
		let bldgtypeid = e.target.getAttribute('datatag');
		let inputtype = e.target.type;
		let subkey;
		if (inputtype == 'select-one') {
			subkey = 'type';
			state.types[bldgtypeid][subkey] = value;
			inputCallback(state);
		}

		if (inputtype == 'number') {
			subkey = 'area';
			state.types[bldgtypeid][subkey] = value;
			inputCallback(state);
		}
	};

	const handleBuildingTypeBlur = e => {
		let state = Object.assign({}, buildingInputs);
		let value = e.target.value;
		let bldgtypeid = e.target.getAttribute('datatag');
		let inputtype = e.target.type;
		let subkey;
		if (inputtype == 'select-one') {
			subkey = 'type';
		}
		if (inputtype == 'number') {
			subkey = 'area';
		}
		state.types[bldgtypeid][subkey] = value;
		inputCallback(state);
	};

	const removeBuildingType = e => {
		let toremove = e.target.getAttribute('dataremove');
		let state = Object.assign({}, buildingInputs);
		delete state.types[toremove];

		// setBldg(state);
		inputCallback(state);
	};

	const addBuildingType = () => {
		let state = Object.assign({}, buildingInputs);
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
		// setBldg(state);
		inputCallback(state);
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

				{Object.keys(buildingInputs.types).map(id => {
					let { type, area } = buildingInputs.types[id];
					return (
						<React.Fragment key={id}>
							<BuildingType
								bldgtype={type}
								area={area}
								typenum={id}
								removeCallback={removeBuildingType}
								updateCallback={handleBuildingTypeChange}
								blurCallback={handleBuildingTypeBlur}
							></BuildingType>
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
				<input type="checkbox" onClick={useDefaultRates} />
				<div className="head-text-4">Use Default Rates</div>
			</div>
			<div className="utility-input-main-container">
				<UtilityInput
					title="Electricity"
					cons_title="kWh"
					utiltag="elec"
					cost_title="$/kWh"
					vals={buildingInputs.utilities.elec}
					changeCallback={handleUtilityChange}
					blurCallback={handleUtilityBlur}
				></UtilityInput>

				<UtilityInput
					title="Natural Gas"
					cons_title="therms"
					utiltag="gas"
					cost_title="$/therm"
					vals={buildingInputs.utilities.gas}
					changeCallback={handleUtilityChange}
					blurCallback={handleUtilityBlur}
				></UtilityInput>

				<UtilityInput
					title="Steam"
					cons_title="mLbs"
					utiltag="steam"
					cost_title="$/mLb"
					vals={buildingInputs.utilities.steam}
					changeCallback={handleUtilityChange}
					blurCallback={handleUtilityBlur}
				></UtilityInput>

				<UtilityInput
					title="Fuel Oil 2"
					cons_title="gal"
					utiltag="fuel_two"
					cost_title="$/gal"
					default_rate="1.65"
					vals={buildingInputs.utilities.fuel_two}
					changeCallback={handleUtilityChange}
					blurCallback={handleUtilityBlur}
				></UtilityInput>

				<UtilityInput
					title="Fuel Oil 4"
					cons_title="gal"
					utiltag="fuel_four"
					cost_title="$/gal"
					default_rate="1.65"
					vals={buildingInputs.utilities.fuel_four}
					changeCallback={handleUtilityChange}
					blurCallback={handleUtilityBlur}
				></UtilityInput>
			</div>
		</div>
	);
};

export { Sidebar };
