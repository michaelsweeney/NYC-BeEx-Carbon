import React from 'react';
import { conn } from '../store/connect';

const HeaderTitle = (props) => {
	const { loadInputSelection } = props;

	const propertyName = loadInputSelection.property_name;

	console.log(loadInputSelection);
	console.log(propertyName);

	return (
		<div className="title-container">
			<div className={propertyName ? 'title-text title-small' : 'title-text'}>
				NYC LL97 Carbon Emissions Calculator
			</div>
			<div
				className="title-text property-name"
				onClick={propertyName ? () => props.actions.setLoadConfirmDialogActive(true) : null}
			>
				{propertyName ? propertyName : ''}
			</div>
			<div className="title-after"></div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		loadInputSelection: state.ui.loadInputSelection,
	};
};

export default conn(mapStateToProps)(HeaderTitle);
