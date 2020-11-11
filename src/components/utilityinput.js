import React, { useRef } from 'react';
import NumberFormat from 'react-number-format';
import { conn } from '../store/connect';

const UtilityInput = (props) => {
	let { title, cons_title, cost_title, utiltag, inputs, vals } = props;
	const consumptionRef = useRef(null);
	const rateRef = useRef(null);

	const consumptionCallback = (e) => {
		let { floatValue } = e;
		let fuel = consumptionRef.current.props.datatag;
		let state = Object.assign({}, inputs);
		state.utilities[fuel].cons = floatValue ? floatValue : 0;
		props.actions.setBuilding(state);
	};

	const rateCallback = (e) => {
		let { floatValue } = e;
		let fuel = rateRef.current.props.datatag;
		let state = Object.assign({}, inputs);
		state.utilities[fuel].rate = floatValue ? floatValue : 0;
		props.actions.setBuilding(state);
	};

	return (
		<div className={`${utiltag}-container utility-input-container`}>
			<div className="consumption-container">
				<div className="head-text-4">{`${title} - ${cons_title}`}</div>
				<NumberFormat
					ref={consumptionRef}
					displayType="input"
					datatag={utiltag}
					onValueChange={consumptionCallback}
					thousandSeparator={true}
					value={vals.cons}
				/>
			</div>
			<div className="cost-container">
				<div className="head-text-4">{cost_title}</div>
				<NumberFormat
					ref={rateRef}
					displayType="input"
					datatag={utiltag}
					onValueChange={rateCallback}
					value={vals.rate}
				/>
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
