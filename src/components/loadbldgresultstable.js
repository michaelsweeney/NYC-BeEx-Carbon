import React, { useEffect, useRef } from 'react';

const LoadBldgResultsTable = (props) => {
	const { loadTableData, handleLoad, loadInputResponse, isLoadedError } = props;
	if (isLoadedError) {
		return <div>error accessing LL84 database...</div>;
	}
	return (
		<div className="load-modal-results-table-container">
			<table className="load-modal-results-table">
				<thead>
					<tr>
						<td> {''} </td>
						{Object.keys(Object.values(loadTableData)[0]).map((row, i) => (
							<td style={{ width: [300, 200, 150, 150, 150, 100][i] }} key={i}>
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
									<div className="select-bldg-btn" onClick={() => handleLoad(loadInputResponse[i])}>
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
	);
};

export { LoadBldgResultsTable };
