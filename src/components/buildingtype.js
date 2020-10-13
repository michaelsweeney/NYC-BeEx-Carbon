import React, { useState, useEffect } from 'react';

const BuildingType = props => {
	const handleAreaChange = e => {
		props.updateCallback(e);
	};

	let { typenum, bldgtype, area } = props;

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
						onChange={props.updateCallback}
						value={bldgtype}
					>
						{Object.keys(buildingtypes).map(type => {
							return (
								<option value={type} key={type + '-option'}>
									{buildingtypes[type]}
								</option>
							);
						})}
					</select>
				</div>
				<div className="area-container">
					<input
						datatag={typenum}
						onChange={handleAreaChange}
						onBlur={props.blurCallback}
						type="number"
						value={area}
					></input>
					<button className={`type-remove-btn`} dataremove={typenum} onClick={props.removeCallback}>
						X
					</button>
				</div>
			</div>
			<div className="bldg-input-border"></div>
		</div>
	);
};

export { BuildingType };
