import React, { useEffect } from 'react';
import Sidebar from './components/sidebar.js';
import CardLayout from './components/cardlayout';
import Header from './components/header.js';
import InfoModal from './components/infomodal.js';
import { Footer } from './components/footer.js';
import SmallScreen from './components/smallscreen.js';

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
	const { dims } = props;

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	const handleResize = () => {
		props.actions.setDimensions({
			height: window.innerHeight,
			width: window.innerWidth,
		});
	};

	useEffect(() => {
		if (dims.width < 750 || dims.height < 500) {
			props.actions.setIsSmallScreen(true);
		} else {
			props.actions.setIsSmallScreen(false);
		}
	}, [dims, props.actions]);

	return (
		<React.Fragment>
			<InfoModal />
			<LoadBldgModal />
			<SmallScreen />
			<div className="main-container">
				<Header />
				<Sidebar></Sidebar>
				<CardLayout />
			</div>
			<Footer />
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		dims: state.ui.dims,
	};
};

export default conn(mapStateToProps)(App);
