import React from 'react';

class UtilityInput extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { title, cons_title, cost_title, utiltag, changeCallback, blurCallback, vals, demoval } = this.props;

		return (
			<div className={`${utiltag}-container utility-input-container`}>
				<div className="consumption-container">
					<div className="head-text-4">{`${title} - ${cons_title}`}</div>
					<input
						onFocus={this.props.disableDemoCallback}
						type="number"
						datatag={utiltag + '-cons'}
						onChange={changeCallback}
						onBlur={blurCallback}
						value={!this.props.isDemoMode ? vals.cons : demoval.cons}
					></input>
				</div>
				<div className="cost-container">
					<div className="head-text-4">{cost_title}</div>
					<input
						onFocus={this.props.disableDemoCallback}
						type="number"
						datatag={utiltag + '-rate'}
						onChange={changeCallback}
						onBlur={blurCallback}
						value={!this.props.isDemoMode ? vals.rate : demoval.rate}
					></input>
				</div>
			</div>
		);
	}
}

export { UtilityInput };
