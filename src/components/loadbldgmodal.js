import React, { useState, useEffect } from 'react';

import { BeExLogo } from './beexlogo.js';
import { createDemoBuilding } from './defaultbuilding.js';
import { handleResponse, parseResponse } from './soqlquery.js';
import { compileBuilding } from './compilebuilding.js';

const LoadBldgModal = props => {
	const demobuilding = createDemoBuilding();
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

	const handleChange = e => {
		setValue(e.target.value);
		handleResponse(e.target.value, setResponse);
	};

	const handleLoad = bldginfo => {
		let formatted_bldg = parseResponse(bldginfo);
		loadBuildingCallback(formatted_bldg);
		hideCallback();
	};

	return (
		<div className={`modal ${isactive ? 'active' : 'inactive'}`}>
			<div className="modal-content">
				<div className="head-text-1">
					Building Utility Info Loader
					<button className="modal-exit-btn" onClick={hideCallback}>
						x
					</button>
				</div>

				<div>
					<div>
						<input value={value} onChange={handleChange} />
						<div>Value:</div>
						<table>
							<thead>
								<tr>
									<td> - </td>
									{Object.keys(Object.values(response)[0]).map((row, i) => (
										<td key={i}>{row}</td>
									))}
								</tr>
							</thead>
							<tbody>
								{Object.values(response).map((row, i) => (
									<tr key={i}>
										<td>
											<button onClick={() => handleLoad(row)}>LOAD</button>
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
