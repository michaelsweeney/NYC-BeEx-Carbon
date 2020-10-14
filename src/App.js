import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/sidebar.js';
import { CardLayout } from './components/cardlayout';
import { Header } from './components/header.js';
import { InfoModal } from './components/infomodal.js';
import { createDefaultBuilding, createDemoBuilding } from './components/defaultbuilding.js';
import { compileBuilding } from './components/compilebuilding.js';
import { PrintLayout } from './components/printlayout.js';
import { Footer } from './components/footer.js';
import { SmallScreen } from './components/smallscreen.js';
import { LoadBldgModal } from './components/loadbldgmodal';

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
	const defaultbuilding = createDefaultBuilding();
	const demobuilding = createDemoBuilding();

	const [building, setBuilding] = useState(compileBuilding(defaultbuilding));
	const [buildingInputs, setBuildingInputs] = useState(defaultbuilding);

	const [infoModalActive, setInfoModalActive] = useState(false);
	const [loadBldgModalActive, setLoadBldgModalActive] = useState(true);

	const [dims, setDims] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});

	const [isDemoMode, setIsDemoMode] = useState(false);
	const [isLoadMode, setIsLoadMode] = useState(false);

	const [defaultRates, setDefaultRates] = useState(false);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	const demoModeCallback = isdemoflag => {
		if (isdemoflag) {
			setBuilding(compileBuilding(demobuilding));
			inputCallback(demobuilding);
		} else {
			setBuilding(compileBuilding(defaultbuilding));
			inputCallback(defaultbuilding);
		}
		setIsDemoMode(!isDemoMode);
	};

	const inputCallback = building => {
		setIsDemoMode(false);
		setIsLoadMode(false);
		setBuilding(compileBuilding(building));
		setBuildingInputs(building);
	};

	const hideInfoModal = () => {
		setInfoModalActive(false);
	};

	const showInfoModal = () => {
		setInfoModalActive(true);
	};

	const handleResize = () => {
		setDims({
			height: window.innerHeight,
			width: window.innerWidth,
		});
	};

	const toggleLoadBldgModal = () => {
		setLoadBldgModalActive(!loadBldgModalActive);
	};

	const hideLoadBldgModal = () => {
		setLoadBldgModalActive(false);
	};

	const loadBuildingCallback = bldg => {
		setIsLoadMode(!isLoadMode);
		setIsDemoMode(false);
		setBuilding(compileBuilding(bldg));
		setBuildingInputs(bldg);
	};

	let { width, height } = dims;
	let isSmallScreen = false;
	if (width < 750 || height < 500) {
		isSmallScreen = true;
	}

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
				<Sidebar
					buildingInputs={buildingInputs}
					defaultbuilding={defaultbuilding}
					inputCallback={inputCallback}
					modalcallback={showInfoModal}
				></Sidebar>
				<CardLayout building={building}></CardLayout>
			</div>
			<Footer modalcallback={showInfoModal}></Footer>
		</React.Fragment>
	);
};

export default App;
