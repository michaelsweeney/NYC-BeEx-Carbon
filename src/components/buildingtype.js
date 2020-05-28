import React from 'react';

class BuildingType extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
	}

	componentDidUpdate() {
		// console.log(this.props)
	}

	handleAreaChange = e => {
		this.props.updateCallback(e);
		this.setState({ value: e.target.value });
	};

	render() {
		let { typenum, demoval } = this.props;

		if (!demoval) {
			demoval = { area: 0 };
		}

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
						<select className="bldg-type-select" datatag={typenum} onChange={this.props.updateCallback}>
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
							onFocus={this.props.disableDemoCallback}
							datatag={typenum}
							onChange={this.handleAreaChange}
							onBlur={this.props.blurCallback}
							type="number"
							value={this.props.isDemoMode ? demoval.area : this.state.value}
						></input>
						<button className={`type-remove-btn`} dataremove={typenum} onClick={this.props.removeCallback}>
							X
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export { BuildingType };
