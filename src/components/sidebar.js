import React, { useState, useEffect } from 'react';
import { HelpOutline } from '@material-ui/icons';
import { UtilityInput } from './utilityinput.js';
import { BuildingType } from './buildingtype.js';
import { Add } from '@material-ui/icons';
import { Print } from '@material-ui/icons';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.defaultbuilding;
	}

	disableDemo = e => {
		this.props.disableDemoCallback();
	};

	useDefaultRates = e => {
		if (e.target.checked) {
			let state = Object.assign({}, this.state);
			state.utilities.elec.rate = '0.22';
			state.utilities.gas.rate = '0.997';
			state.utilities.steam.rate = '35';
			state.utilities.fuel_two.rate = '1.65';
			state.utilities.fuel_four.rate = '1.65';
			this.setState(state);
			this.props.callback(state);
		} else {
			let state = Object.assign({}, this.state);
			state.utilities.elec.rate = '';
			state.utilities.gas.rate = '';
			state.utilities.steam.rate = '';
			state.utilities.fuel_two.rate = '';
			state.utilities.fuel_four.rate = '';
			this.setState(state);
			this.props.callback(state);
		}
	};

	handleUtilityChange = e => {
		let value = e.target.value;
		let [fuel, type] = e.target.getAttribute('datatag').split('-');
		let state = Object.assign({}, this.state);
		state.utilities[fuel][type] = value;
		this.setState(state);
	};

	handleUtilityBlur = e => {
		let value = e.target.value;
		let [fuel, type] = e.target.getAttribute('datatag').split('-');
		let state = Object.assign({}, this.state);
		state.utilities[fuel][type] = value;
		this.props.callback(state);
	};

	handleBuildingTypeChange = e => {
		let state = Object.assign({}, this.state);
		let value = e.target.value;
		let bldgtypeid = e.target.getAttribute('datatag');
		let inputtype = e.target.type;
		let subkey;
		if (inputtype == 'select-one') {
			subkey = 'type';
			state.types[bldgtypeid][subkey] = value;
			this.setState(state);
			this.props.callback(state);
		}

		if (inputtype == 'number') {
			subkey = 'area';
			state.types[bldgtypeid][subkey] = value;
			this.setState(state);
		}
	};
	handleBuildingTypeBlur = e => {
		let state = Object.assign({}, this.state);
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
		// this.setState(state)
		this.props.callback(state);
	};

	removeBuildingType = e => {
		let toremove = e.target.getAttribute('dataremove');
		let state = Object.assign({}, this.state);
		delete state.types[toremove];

		this.setState(state);
		this.props.callback(state);
	};

	addBuildingType = () => {
		let state = Object.assign({}, this.state);
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
		this.setState(state);
		this.props.callback(state);
	};

	printReport = () => {
		window.print();
	};

	render() {
		console.log(this.props.demobuilding);
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
							<sup style={{ marginLeft: '5px', paddingTop: '5px' }}>?</sup>
						</a>
					</div>
					<div className="input-header-area head-text-4">Area (SF)</div>

					{Object.keys(this.state.types).map(id => {
						return (
							<React.Fragment key={id}>
								<BuildingType
									disableDemoCallback={this.disableDemo}
									isDemoMode={this.props.isDemoMode}
									demoval={this.props.demobuilding.types[id]}
									typenum={id}
									removeCallback={this.removeBuildingType}
									updateCallback={this.handleBuildingTypeChange}
									blurCallback={this.handleBuildingTypeBlur}
								></BuildingType>
							</React.Fragment>
						);
					})}

					<div className="add-building-type">
						<button onClick={this.addBuildingType}>+</button>
						<div>Add Building Type</div>
					</div>
				</div>

				{/* ----- UTILITY INPUTS ------ */}

				<div className="head-text-2">
					Utility Inputs
					{/* <HelpOutline style={{ color: 'rgb(184,215,52)', width: '20px', height: '20px', marginLeft: '10px' }}></HelpOutline> */}
				</div>
				{/* <button className='default-rate-btn sidebar-btn' onClick={this.useDefaultRates}>DEFAULT RATES</button> */}
				<div className="default-rate-checkbox head-text-4">
					<input type="checkbox" onClick={this.useDefaultRates} />
					<div className="head-text-4">Use Default Rates</div>
				</div>
				<div className="utility-input-main-container">
					<UtilityInput
						disableDemoCallback={this.disableDemo}
						isDemoMode={this.props.isDemoMode}
						demoval={this.props.demobuilding.utilities.elec}
						title="Electricity"
						cons_title="kWh"
						utiltag="elec"
						cost_title="$/kWh"
						vals={this.state.utilities.elec}
						changeCallback={this.handleUtilityChange}
						blurCallback={this.handleUtilityBlur}
					></UtilityInput>

					<UtilityInput
						disableDemoCallback={this.disableDemo}
						isDemoMode={this.props.isDemoMode}
						demoval={this.props.demobuilding.utilities.gas}
						title="Natural Gas"
						cons_title="therms"
						utiltag="gas"
						cost_title="$/therm"
						vals={this.state.utilities.gas}
						changeCallback={this.handleUtilityChange}
						blurCallback={this.handleUtilityBlur}
					></UtilityInput>

					<UtilityInput
						disableDemoCallback={this.disableDemo}
						isDemoMode={this.props.isDemoMode}
						demoval={this.props.demobuilding.utilities.steam}
						title="Steam"
						cons_title="mLbs"
						utiltag="steam"
						cost_title="$/mLb"
						vals={this.state.utilities.steam}
						changeCallback={this.handleUtilityChange}
						blurCallback={this.handleUtilityBlur}
					></UtilityInput>

					<UtilityInput
						disableDemoCallback={this.disableDemo}
						isDemoMode={this.props.isDemoMode}
						demoval={this.props.demobuilding.utilities.fuel_two}
						title="Fuel Oil 2"
						cons_title="gal"
						utiltag="fuel_two"
						cost_title="$/gal"
						default_rate="1.65"
						vals={this.state.utilities.fuel_two}
						changeCallback={this.handleUtilityChange}
						blurCallback={this.handleUtilityBlur}
					></UtilityInput>

					<UtilityInput
						disableDemoCallback={this.disableDemo}
						isDemoMode={this.props.isDemoMode}
						demoval={this.props.demobuilding.utilities.fuel_four}
						title="Fuel Oil 4"
						cons_title="gal"
						utiltag="fuel_four"
						cost_title="$/gal"
						default_rate="1.65"
						vals={this.state.utilities.fuel_four}
						changeCallback={this.handleUtilityChange}
						blurCallback={this.handleUtilityBlur}
					></UtilityInput>
				</div>
			</div>
		);
	}
}

export { Sidebar };
