import React, { useState, useEffect } from 'react';

import { handleResponse, parseResponse } from './soqlquery.js';

const LoadBldgModal = props => {
	const { isactive, hideCallback, loadBuildingCallback } = props;

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('mousedown', handleClick);
		};
	});

	const handleKeyDown = e => {
		if (e.key == 'Escape') {
			hideCallback();
		}
	};

	const handleClick = e => {
		if (!e.target.classList.contains('modal-content') && e.target.classList.contains('modal')) {
			hideCallback();
		}
	};

	const [value, setValue] = useState('');
	const [response, setResponse] = useState([{}]);
	const [tableData, setTableData] = useState([{}]);

	const handleChange = e => {
		setValue(e.target.value);
		handleResponse(e.target.value, setResponse);
	};

	const handleLoad = bldginfo => {
		let formatted_bldg = parseResponse(bldginfo);
		loadBuildingCallback(formatted_bldg);
		hideCallback();
	};

	useEffect(() => {
		console.log(response);

		let formatted = response.map(res => {
			return {
				Name: res.property_name,
				BBL: res.bbl_10_digits,
				'Property Type 1': res.largest_property_use_type,
				'Property Type 2': res._2nd_largest_property_use,
				'Property Type 3': res._3rd_largest_property_use,
			};
		});
		setTableData(formatted);
	}, [response]);

	// Object.values(response).forEach((row, i) => console.log(Object.keys(row).length));

	return (
		<div className={`modal ${isactive ? 'active' : 'inactive'}`}>
			<div className="modal-content load-modal-content">
				<div>
					<div className="head-text-1">
						Building Utility Info Loader
						<button className="modal-exit-btn" onClick={hideCallback}>
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
					<input className="bldg-input" value={value} onChange={handleChange} />

					<div className="load-modal-results-table-container">
						<table className="load-modal-results-table">
							<thead>
								<tr>
									<td> - </td>
									{Object.keys(Object.values(tableData)[0]).map((row, i) => (
										<td style={{ width: [300, 300, 150, 150, 150, 100][i] }} key={i}>
											{row}
										</td>
									))}
								</tr>
							</thead>
							<tbody>
								{Object.values(tableData).map((row, i) => (
									<tr key={i}>
										<td>
											{Object.keys(row).length > 0 ? (
												<div
													className="select-bldg-btn"
													onClick={() => handleLoad(response[i])}
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

export { LoadBldgModal };
