import React, { useState, useEffect, useRef } from 'react';

import { handleResponse, parseResponse } from './soqlquery.js';
import { conn } from '../store/connect';

const LoadBldgModal = props => {
	const { loadInputValue, loadInputResponse, loadTableData, loadBldgModalActive, isDemoMode } = props;

	const inputref = useRef(null);

	useEffect(() => {
		inputref.current.focus();
	}, [loadBldgModalActive]);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('mousedown', handleClick);
		};
	});
	const hideModal = () => {
		props.actions.setLoadBldgModalActive(false);
	};
	const handleKeyDown = e => {
		if (e.key == 'Escape') {
			hideModal();
		}
	};

	const handleClick = e => {
		if (!e.target.classList.contains('modal-content') && e.target.classList.contains('modal')) {
			hideModal();
		}
	};

	const handleChange = e => {
		props.actions.setLoadInputValue(e.target.value);
		handleResponse(e.target.value, props.actions.setLoadInputResponse);
	};

	const handleLoad = bldginfo => {
		let formatted_bldg = parseResponse(bldginfo);
		alert(JSON.stringify(formatted_bldg));
		props.actions.setIsLoadMode(!isDemoMode);
		props.actions.setIsDemoMode(false);
		props.actions.setBuilding(formatted_bldg);
		hideModal();
	};

	useEffect(() => {
		let formatted = loadInputResponse.map(res => {
			return {
				Name: res.property_name,
				BBL: res.bbl_10_digits,
				'Property Type 1': res.largest_property_use_type,
				'Property Type 2': res._2nd_largest_property_use,
				'Property Type 3': res._3rd_largest_property_use,
			};
		});
		props.actions.setLoadTableData(formatted);
	}, [loadInputResponse, props.actions]);

	return (
		<div className={`modal ${loadBldgModalActive ? 'active' : 'inactive'}`}>
			<div className="modal-content load-modal-content">
				<div>
					<div className="head-text-1">
						Building Utility Info Loader
						<button className="modal-exit-btn" onClick={hideModal}>
							x
						</button>
					</div>
				</div>

				<div className="load-modal-body">
					<div>
						<div className="head-text-3">
							This form allows for querying the LL84 Benchmarking Database for building utility
							information, either using the property's BBL number or the property name (property name
							searches are case sensitive)
						</div>
						<div className="head-text-3">
							Note that the "Building Type" submitted under the LL84 dataset does not align with the
							"Building Type" in LL97. For the sake of convenience, an attempt has been made to map these
							types and it is up to the user to correct them in the "Building Inputs" section of the
							sidebar. Refer to ...... for information on LL84 Benchmarking Data set.
						</div>
					</div>
					<div>
						<span className="head-text-3">Input BBL ID Number or Search for Building Name</span>
					</div>
					<input ref={inputref} className="bldg-input" value={loadInputValue} onChange={handleChange} />

					<div className="load-modal-results-table-container">
						<table className="load-modal-results-table">
							<thead>
								<tr>
									<td> - </td>
									{Object.keys(Object.values(loadTableData)[0]).map((row, i) => (
										<td style={{ width: [300, 300, 150, 150, 150, 100][i] }} key={i}>
											{row}
										</td>
									))}
								</tr>
							</thead>
							<tbody>
								{Object.values(loadTableData).map((row, i) => (
									<tr key={i}>
										<td>
											{Object.keys(row).length > 0 ? (
												<div
													className="select-bldg-btn"
													onClick={() => handleLoad(loadInputResponse[i])}
												>
													LOAD
												</div>
											) : (
												''
											)}
										</td>
										{Object.values(row).map((e, i) => (
											<td key={i}>{e}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		loadInputValue: state.ui.loadInputValue,
		loadInputResponse: state.ui.loadInputResponse,
		loadTableData: state.ui.loadTableData,
		loadBldgModalActive: state.ui.loadBldgModalActive,
		isDemoMode: state.ui.isDemoMode,
	};
};

export default conn(mapStateToProps)(LoadBldgModal);
