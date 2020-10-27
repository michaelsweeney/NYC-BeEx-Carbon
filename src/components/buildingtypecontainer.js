import React from 'react';
import { conn } from '../store/connect';
import BuildingType from './buildingtype.js';

const BuildingTypeContainer = props => {
	const { inputs } = props;

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
		<>
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
		</>
	);
};

const mapStateToProps = state => {
	return {
		inputs: state.building.inputs,
	};
};

export default conn(mapStateToProps)(BuildingTypeContainer);
