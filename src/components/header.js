import React from 'react';

import { BeExLogo } from './beexlogo.js';
import { HelpOutline } from '@material-ui/icons';
import HeaderTitle from './headertitle';
import { DemoModeButton } from './demomodebutton';
import { LoadBldgButton } from './loadbldgbutton';
import { conn } from '../store/connect';

const Header = (props) => {
	const { isDemoMode, isLoadMode, loadInputSelection } = props;
	const setInfoModalActive = () => {
		props.actions.setInfoModalActive(true);
	};
	const setLoadModalActive = () => {
		props.actions.setLoadBldgModalActive(true);
		props.actions.setIsDemoMode(false);
	};
	console.log(props);
	const toggleDemo = (isdemo) => {
		if (isdemo) {
			props.actions.setDemoBuilding();
			props.actions.setIsLoadMode(false);
			props.actions.setLoadInputSelection({});
		} else {
			props.actions.setDefaultBuilding();
		}
		props.actions.setIsDemoMode(!isDemoMode);
	};

	const helpStyle = {
		color: 'rgb(184,215,52)',
		width: '30px',
		height: '30px',
		marginLeft: '10px',
	};

	return (
		<div className="header">
			<div className="header-left">
				<a className="logo-beex" href="http://www.be-exchange.org" target="_blank" rel="noopener noreferrer">
					<BeExLogo props={{ width: '200px', height: '75px' }}></BeExLogo>
				</a>
			</div>
			<div className="header-middle">
				<HeaderTitle />
			</div>
			<div className="header-right">
				<LoadBldgButton isLoadMode={isLoadMode} loadBldgCallback={setLoadModalActive} />
				<DemoModeButton isDemoMode={isDemoMode} callback={toggleDemo}></DemoModeButton>
				<div className="help-btn" style={helpStyle} onClick={setInfoModalActive}>
					<HelpOutline></HelpOutline>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isDemoMode: state.ui.isDemoMode,
		isLoadMode: state.ui.isLoadMode,
		loadInputSelection: state.ui.loadInputSelection,
	};
};
export default conn(mapStateToProps)(Header);
