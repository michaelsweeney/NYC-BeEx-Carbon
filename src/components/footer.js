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
				<div className="footer-logos">
					<span className='footer-text footer-text-ny'>
					Produced By
					</span>
					<a
						className="logo-nyc"
						href="https://retrofitaccelerator.cityofnewyork.us/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src="ACCELERATOR-WHITE.png" height="60" width="120"></img>
					</a>
					<span className='footer-text footer-text-akf'>
					Powered By
					</span>
					<a className="logo-akf" href="http://www.akfgroup.com" target="_blank" rel="noopener noreferrer">
						<img src="logo-akf.jpg" height="50" width="90"></img>
					</a>
				</div>

			</div>
		);
	}
}
export { Footer };
