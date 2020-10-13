import React, { useState, useEffect } from 'react';

import { BeExLogo } from './beexlogo.js';
import { HelpOutline } from '@material-ui/icons';

import { DemoModeButton } from './demomodebutton';
import { LoadBldgButton } from './loadbldgbutton';

const Header = props => {
	const { isDemoMode, isLoadMode, modalcallback, demoModeCallback, loadModalCallback } = props;

	const toggleDemo = isdemo => {
		demoModeCallback(isdemo);
	};

	const toggleLoad = () => {
		loadModalCallback();
	};

	const helpStyle = {
		color: 'rgb(184,215,52)',
		width: '30px',
		height: '30px',
		marginLeft: '10px',
	};
	return (
		<div className="header">
			<a className="logo-beex" href="http://www.be-exchange.org" target="_blank" rel="noopener noreferrer">
				<BeExLogo props={{ width: '200px', height: '100px' }}></BeExLogo>
			</a>
			<div className="title-container">
				<div className="title-text">NYC LL97 Carbon Emissions Calculator</div>
			</div>
			<div className="title-after"></div>
			<LoadBldgButton isLoadMode={isLoadMode} loadBldgCallback={toggleLoad} />
			<DemoModeButton isDemoMode={isDemoMode} callback={toggleDemo}></DemoModeButton>
			<div className="help-btn" style={helpStyle} onClick={modalcallback}>
				<HelpOutline></HelpOutline>
			</div>
		</div>
	);
};

export { Header };
