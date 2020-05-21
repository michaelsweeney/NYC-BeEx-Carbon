import React, {useState, useEffect} from 'react';

import { BeExLogo } from './beexlogo.js';
import { HelpOutline } from '@material-ui/icons';



const DemoModeButton = (props) => {

	const [isDemo, setIsDemo] = useState(false)
	const setDemo = () => {
    setIsDemo(!isDemo)
    props.callback(!isDemo)
  }
  
	return (
		<button className={isDemo ? 'demo-btn demo-on' : ' demo-btn demo-off' } onClick={setDemo}>DEMO</button>
	)
}


class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	toggleDemo = (isdemo) => {
		this.props.demoModeCallback(isdemo)
	}

	render() {
		return (
			<div className="header">
				<a className="logo-beex" href="http://www.be-exchange.org" target="_blank" rel="noopener noreferrer">
					<BeExLogo props={{ width: '200px', height: '100px' }}></BeExLogo>
				</a>
				<div className="title-container">
					<div className="title-text">NYC LL97 Carbon Emissions Calculator</div>
				</div>
				<div className="title-after"></div> 
				<DemoModeButton callback={this.toggleDemo}></DemoModeButton>
				<HelpOutline
					onClick={this.props.modalcallback}
					className="help-btn"
					style={{ color: 'rgb(184,215,52)', width: '30px', height: '30px', marginLeft: '10px' }}
				></HelpOutline>
			</div>
		);
	}
}

export { Header };
