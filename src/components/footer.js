import React from 'react';

import { BeExLogo } from './beexlogo.js';
import { HelpOutline } from '@material-ui/icons';

class Footer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="footer">
				<div className="footer-left">
					<p>
						What now? Visit{' '}
						<a
							href="https://retrofitaccelerator.cityofnewyork.us/"
							target="_blank"
							rel="noopener noreferrer"
						>
							NYC Accelerator
						</a>{' '}
						for free, personalized advisory services to improve building energy efficiency and lower carbon
						emissions.
					</p>
				</div>
				<div className="footer-right">
					<p>
						<a href="http://www.akfgroup.com" target="_blank" rel="noopener noreferrer">
							Powered by AKF Group LLC
						</a>
					</p>
				</div>
				{/* What now? Visit NYC Accelerator for free, personalized advisory services to improve building energy
efficiency and lower carbon emissions. */}

				{/* OLD FOOTER*/}
				{/* <div className="footer-logos">
					<span className="footer-text footer-text-ny">Produced By</span>
					<a
						className="logo-nyc"
						href="https://retrofitaccelerator.cityofnewyork.us/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src="ACCELERATOR-WHITE.png" height="60" width="120"></img>
					</a>
					<span className="footer-text footer-text-akf">Powered By</span>
					<a className="logo-akf" href="http://www.akfgroup.com" target="_blank" rel="noopener noreferrer">
						<img src="logo-akf.jpg" height="50" width="100"></img>
					</a>
				</div> */}
			</div>
		);
	}
}
export { Footer };
