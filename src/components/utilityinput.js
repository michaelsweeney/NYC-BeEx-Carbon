import React from 'react';
import { conn } from '../store/connect';

const UtilityInput = props => {
	let { title, cons_title, cost_title, utiltag, inputs, vals } = props;

	const changeCallback = e => {
		let value = e.target.value;
		let [fuel, type] = e.target.getAttribute('datatag').split('-');
		let state = Object.assign({}, inputs);
		state.utilities[fuel][type] = value;
		props.actions.setBuilding(state);
	};

	return (
		<div className={`${utiltag}-container utility-input-container`}>
			<div className="consumption-container">
				<div className="head-text-4">{`${title} - ${cons_title}`}</div>
				<input type="number" datatag={utiltag + '-cons'} onChange={changeCallback} value={vals.cons}></input>
			</div>
			<div className="cost-container">
				<div className="head-text-4">{cost_title}</div>
				<input type="number" datatag={utiltag + '-rate'} onChange={changeCallback} value={vals.rate}></input>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	const { utiltag } = ownProps;
	return {
		vals: state.building.inputs.utilities[utiltag],
		inputs: state.building.inputs,
	};
};

export default conn(mapStateToProps)(UtilityInput);
