import React from 'react';
import { Modal } from './modal.js';

import { conn } from '../store/connect';

const LoadConfirmDialog = props => {
	const { loadConfirmDialogActive, loadInputSelection } = props;

	const hideDialog = () => {
		props.actions.setLoadConfirmDialogActive(false);
	};

	const keyNameLookup = {
		property_name: 'Property Name',
		property_id: 'Property ID',
		bbl_10_digits: 'BBL ID (10 digit)',
		largest_property_use_type_1: 'Property Type 1 Area',
		largest_property_use_type: 'Property Type 1',
		_2nd_largest_property_use: 'Property Type 2 Area',
		_2nd_largest_property_use_1: 'Property Type 2',
		_3rd_largest_property_use: 'Property Type 3 Area',
		_3rd_largest_property_use_1: 'Property Type 3',
		fuel_oil_2_use_kbtu: 'Fuel Oil Two Use (kBtu)',
		fuel_oil_4_use_kbtu: 'Fuel Oil Four Use (kBtu)',
		district_steam_use_kbtu: 'District Steam Use (kBtu)',
		natural_gas_use_kbtu: 'Natural Gas Use (kBtu)',
		electricity_use_grid_purchase: 'Electricity Purchased From Grid (kBtu)',
	};

	const loadMarkup = Object.keys(loadInputSelection).map(e => {
		const keyName = keyNameLookup[e];
		const val = loadInputSelection[e];
		if ((val !== 'Not Available') & (val !== 0)) {
			return (
				<div>
					{keyName}: {val}
				</div>
			);
		} else {
			return '';
		}
	});

	return (
		<Modal active={loadConfirmDialogActive} hideCallback={hideDialog}>
			<div className="head-text-1">
				LOADED BUILDING FEEDBACK
				<button className="modal-exit-btn" onClick={hideDialog}>
					x
				</button>
			</div>
			<div className="load-modal-body">
				<div className="head-text-3">
					The following info has been loaded from the NYC LL84 Database. Note that inputs should be verified
					by the building owner / stakeholder for accuracy. Because property use types in LL84 do not align
					with 'building types' under LL97, user should check mapping in the sidebar.
				</div>
				<div>{loadMarkup}</div>
				<button style={{ height: '42px' }} className="select-bldg-btn active" onClick={hideDialog}>
					OK
				</button>
			</div>
		</Modal>
	);
};

const mapStateToProps = state => {
	return {
		loadConfirmDialogActive: state.ui.loadConfirmDialogActive,
		loadInputSelection: state.ui.loadInputSelection,
	};
};

export default conn(mapStateToProps)(LoadConfirmDialog);
