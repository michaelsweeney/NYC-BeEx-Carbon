import React from 'react';

import { BeExLogo } from './beexlogo.js';
import { NotesAndClarifications } from './notesandclarifications.js';

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isactive: props.isactive };
		this.setListeners();
	}
	setInactive = () => {
		this.props.callback();
	};

	setListeners() {
		window.addEventListener('keydown', e => {
			if (e.key == 'Escape') {
				this.props.callback();
			}
		});
		window.addEventListener('click', e => {
			if (!e.target.classList.contains('modal-content') && e.target.classList.contains('modal')) {
				this.props.callback();
			}
		});
	}

	render() {
		return (
			<div className={`modal ${this.props.isactive ? 'active' : 'inactive'}`}>
				<div className="modal-content">
					<div className="head-text-1">
						{' '}
						NYC LL97 Carbon Emissions Calculator (BETA)
						<button className="modal-exit-btn" onClick={this.setInactive}>
							x
						</button>
					</div>
					<div className="head-text-2">
						{' '}
						This tool is currently in BETA testing. Please{' '}
						<a href="mailto:calculator@be-exchange.org">email us</a> with comments or bug reports.
					</div>

					<div className="instructions-container">
						<div className="head-text-3"> About this calculator</div>
						<div className="head-text-4">
							<p>
								This calculator estimates a building's carbon penalty as a result of recently-enacted{' '}
								<a
									href="https://be-exchange.org/insight/the-climate-mobilization-act-int-1253/"
									target="_blank"
									rel="noopener noreferrer"
								>
									NYC LL97
								</a>
								. Input annual utility information and building characteristics to generate emissions
								thresholds and resulting estimated penalties for three major penalty periods (2024-2029,
								2030-2034, and 2035 and later).
							</p>
							<p>
								This calculator is one tool in a{' '}
								<a
									href="https://be-exchange.org/climate-mobilization-act-series/"
									target="_blank"
									rel="noopener noreferrer"
								>
									suite of resources{' '}
								</a>
								developed by the Building Energy Exchange in partnership with the NYC Accelerator to
								help demystify the Climate Mobilization Act and connect our community to solutions. This
								calculator is powered by AKF Group with UX/UI design by Jessica Celano.
							</p>

							<p>
								This application is optimized for Google Chrome. If experiencing issues with a different
								browser, please try again using Chrome.
							</p>
						</div>
					</div>

					<div className="instructions-container">
						<div className="head-text-3"> Instructions</div>
						<ol className="head-text-4">
							<li>
								Select your building type(s) and area. Additional building types can be added via the
								"Add Building Type" button.
							</li>
							<li>Enter your annual consumption per fuel source for the entire building.</li>
							<li>
								Enter your annual utility rate for each fuel source (total annual utility cost divided
								by total annual consumption).
							</li>
							<li>
								If you don't know your utility rates, use the "USE DEFAULT RATES" button to
								pre-populate the form with NYC average data for typical commercial buildings.
							</li>
						</ol>
					</div>
					<div className="notes-clarifications-container">
						<div className="head-text-3">Notes and Clarifications</div>
						<NotesAndClarifications></NotesAndClarifications>
					</div>

					<div className="modal-logos">
						<a
							className="logo-nyc"
							href="https://retrofitaccelerator.cityofnewyork.us/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src="ACCELERATOR-WHITE.png" height="60" width="120"></img>
						</a>
						<a
							className="logo-beex"
							href="http://www.be-exchange.org"
							target="_blank"
							rel="noopener noreferrer"
						>
							<BeExLogo props={{ width: '150px', height: '75px' }}></BeExLogo>
						</a>
						<a
							className="logo-akf"
							href="http://www.akfgroup.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src="logo-akf.jpg" height="50" width="90"></img>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export { Modal };
