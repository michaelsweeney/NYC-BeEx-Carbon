import React, { useRef } from 'react';
import NumberFormat from 'react-number-format';

import { conn } from '../store/connect';

const BuildingTypeInput = (props) => {
	const { typenum, bldgtype, area } = props;
	const { inputs } = props;

	const areaRef = useRef(null);

	const handleBuildingTypeChange = (e) => {
		let state = Object.assign({}, inputs);
		let value = e.target.value;
		let bldgtypeid = e.target.getAttribute('datatag');

		state.types[bldgtypeid].type = value;

		props.actions.setBuilding(state);
	};

	const handleAreaChange = (e) => {
		let { floatValue } = e;
		let state = Object.assign({}, inputs);
		let bldgtypeid = areaRef.current.props.datatag;
		state.types[bldgtypeid].area = floatValue;
		props.actions.setBuilding(state);
	};

	const removeCallback = (e) => {
		let toremove = e.target.getAttribute('dataremove');
		let state = Object.assign({}, inputs);
		delete state.types[toremove];
		props.actions.setBuilding(state);
	};

	let buildingtypes = {
		A: 'A (Assembly)',
		B_norm: 'B (Business)',
		B_health: 'B (Healthcare)',
		E: 'E (Educational)',
		F: 'F (Factory/Industrial)',
		H: 'H (High Hazard)',
		I1: 'I-1 (Institutional)',
		I2: 'I-2 (Institutional)',
		I3: 'I-3 (Institutional)',
		I4: 'I-4 (Institutional)',
		M: 'M (Mercantile)',
		R1: 'R-1 (Residential)',
		R2: 'R-2 (Residential)',
		S: 'S (Storage)',
		U: 'U (Utility/Misc)',
	};

	return (
		<div className="bldg-input-container">
			<div className="type-controls-container">
				<div className="type-label">{`${typenum}`}</div>

				<div className="type-container">
					<select
						className="bldg-type-select"
						datatag={typenum}
						onChange={handleBuildingTypeChange}
						value={bldgtype}
					>
						{Object.keys(buildingtypes).map((type) => {
							return (
								<option value={type} key={type + '-option'}>
									{buildingtypes[type]}
								</option>
							);
						})}
					</select>
				</div>
				<div className="area-container">
					<NumberFormat
						ref={areaRef}
						datatag={typenum}
						onValueChange={handleAreaChange}
						thousandSeparator={true}
						value={area}
					/>
					<button className={`type-remove-btn`} dataremove={typenum} onClick={removeCallback}>
						X
					</button>
				</div>
			</div>
			<div className="bldg-input-border"></div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		inputs: state.building.inputs,
	};
};

export default conn(mapStateToProps)(BuildingTypeInput);
