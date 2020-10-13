import React from 'react';

const UtilityInput = props => {
	let { title, cons_title, cost_title, utiltag, changeCallback, blurCallback, vals } = props;

	return (
		<div className={`${utiltag}-container utility-input-container`}>
			<div className="consumption-container">
				<div className="head-text-4">{`${title} - ${cons_title}`}</div>
				<input
					type="number"
					datatag={utiltag + '-cons'}
					onChange={changeCallback}
					onBlur={blurCallback}
					value={vals.cons}
				></input>
			</div>
			<div className="cost-container">
				<div className="head-text-4">{cost_title}</div>
				<input
					onFocus={props.disableDemoCallback}
					type="number"
					datatag={utiltag + '-rate'}
					onChange={changeCallback}
					onBlur={blurCallback}
					value={vals.rate}
				></input>
			</div>
		</div>
	);
};

export { UtilityInput };
