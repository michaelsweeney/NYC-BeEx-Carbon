import React, { useEffect } from 'react';
import { Sidebar } from './components/sidebar.js';
import { CardLayout } from './components/cardlayout';
import { Header } from './components/header.js';
import { InfoModal } from './components/infomodal.js';
import { Footer } from './components/footer.js';
import { SmallScreen } from './components/smallscreen.js';

import LoadBldgModal from './components/loadbldgmodal';

import { conn } from './store/connect';

import './App.css';
import './css/sidebar.css';
import './css/mainlayout.css';
import './css/header.css';
import './css/chart.css';
import './css/printlayout.css';
import './css/infomodal.css';
import './css/loadmodal.css';
import './css/typography.css';
import './css/logos.css';
import './css/footer.css';

const App = props => {
	const { compiled, inputs } = props.data.building;

	const { dims, isDemoMode, isLoadMode, infoModalActive, loadBldgModalActive } = props.data.ui;

	let isSmallScreen = false;
	if (dims.width < 750 || dims.height < 500) {
		isSmallScreen = true;
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	const demoModeCallback = isdemoflag => {
		if (isdemoflag) {
			props.actions.setDemoBuilding();
		} else {
			props.actions.setDefaultBuilding();
		}
		props.actions.setIsDemoMode(!isDemoMode);
	};

	const inputCallback = building => {
		props.actions.setBuilding(building);
	};

	const hideInfoModal = () => {
		props.actions.setInfoModalActive(false);
	};

	const showInfoModal = () => {
		props.actions.setInfoModalActive(true);
	};

	const handleResize = () => {
		props.actions.setDimensions({
			height: window.innerHeight,
			width: window.innerWidth,
		});
	};

	const toggleLoadBldgModal = () => {
		props.actions.setLoadBldgModalActive(!loadBldgModalActive);
	};

	const hideLoadBldgModal = () => {
		props.actions.setLoadBldgModalActive(false);
	};

	const loadBuildingCallback = bldg => {
		props.actions.setIsLoadMode(!isDemoMode);
		props.actions.setIsDemoMode(false);
		props.actions.setBuilding(bldg);
	};

	return (
		<React.Fragment>
			<InfoModal isactive={infoModalActive} hideCallback={hideInfoModal} />
			<LoadBldgModal
				isactive={loadBldgModalActive}
				hideCallback={hideLoadBldgModal}
				loadBuildingCallback={loadBuildingCallback}
			/>
			<SmallScreen visible={isSmallScreen} />
			<div className="main-container">
				<Header
					isLoadMode={isLoadMode}
					isDemoMode={isDemoMode}
					demoModeCallback={demoModeCallback}
					modalcallback={showInfoModal}
					loadModalCallback={toggleLoadBldgModal}
				></Header>
				<Sidebar buildingInputs={inputs} inputCallback={inputCallback} modalcallback={showInfoModal}></Sidebar>
				<CardLayout building={compiled}></CardLayout>
			</div>
			<Footer modalcallback={showInfoModal}></Footer>
		</React.Fragment>
	);
};

export default conn()(App);
