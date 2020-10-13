import React from 'react';
import { BeExLogo } from './beexlogo.js';
import { formatInt } from './numformat.js';

import { PrintCardLayout } from './printcardlayout';
import { NotesAndClarifications } from './notesandclarifications.js';

const PrintLayout = props => {
	let { summary, utilities } = props.building;

	return (
		<div className="print-layout">
			<div className="head-text-1"> NYC LL97 Carbon Calculator Report</div>

			<div className="print-cards-container">
				<PrintCardLayout building={props.building}></PrintCardLayout>
			</div>

			<div className="head-text-3">Notes and Clarifications</div>

			<NotesAndClarifications />

			<div className="print-logos">
				<a
					className="logo-nyc"
					href="https://retrofitaccelerator.cityofnewyork.us/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src="ACCELERATOR-WHITE.png" height="60" width="120"></img>
				</a>
				<a className="logo-beex" href="http://www.be-exchange.org" target="_blank" rel="noopener noreferrer">
					<BeExLogo props={{ width: '150px', height: '75px' }}></BeExLogo>
				</a>
				<a className="logo-akf" href="http://www.akfgroup.com" target="_blank" rel="noopener noreferrer">
					<img src="logo-akf.jpg" height="50" width="90"></img>
				</a>
			</div>
		</div>
	);
};

export { PrintLayout };
