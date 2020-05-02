import React from 'react';

import { BeExLogo } from './beexlogo.js';
import { HelpOutline } from '@material-ui/icons';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="header">
				<a className="logo-beex" href="http://www.be-exchange.org" target="_blank" rel="noopener noreferrer">
					<BeExLogo props={{ width: '200px', height: '100px' }}></BeExLogo>
				</a>
				<div className="title-container">
					<div className="title-text">
						{/* <Print className='print-btn' onClick={this.printReport} style={{ color: 'rgb(184,215,52)', paddingTop: '5px' }}></Print> */}

						<div className="">NYC LL97</div>
						<div className="sidebar-header">Carbon Emissions Calculator</div>
					</div>
					<div className='title-after'></div>
				</div>

				{/* <HelpOutline
						onClick={this.props.modalcallback}
						className="help-btn"
						style={{ color: 'rgb(184,215,52)', width: '25px', height: '25px', marginLeft: '10px' }}
					></HelpOutline> */}

				{/* <div className='header-copy'>
          <div className='head'> A NYC Accelerator Production</div>
          <div className='mid'>Powered by Building Energy Exchange and AKF Group</div>
        </div> */}

				<div className="header-logos">
					<a
						className="logo-nyc"
						href="https://retrofitaccelerator.cityofnewyork.us/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src="ACCELERATOR-WHITE.png" height="60" width="120"></img>
					</a>
					<a className="logo-akf" href="http://www.akfgroup.com" target="_blank" rel="noopener noreferrer">
						<img src="logo-akf.jpg" height="50" width="90"></img>
					</a>
				</div>
			</div>
		);
	}
}

export { Header };
