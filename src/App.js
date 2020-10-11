import React from 'react';
import { Sidebar } from './components/sidebar.js';
import { CardLayout } from './components/cardlayout';
import { Header } from './components/header.js';
import { Modal } from './components/modal.js';
import { defaultbuilding, demobuilding } from './components/defaultbuilding.js';
import { compileBuilding } from './components/compilebuilding.js';
import { PrintLayout } from './components/printlayout.js';
import { Footer } from './components/footer.js';
import { SmallScreen } from './components/smallscreen.js';

import './App.css';
import './css/sidebar.css';
import './css/mainlayout.css';
import './css/header.css';
import './css/chart.css';
import './css/printlayout.css';
import './css/modal.css';
import './css/typography.css';
import './css/logos.css';
import './css/footer.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			building: compileBuilding(defaultbuilding),
			modalactive: true,
			isDemoMode: false,
			dims: {
				height: window.innerHeight,
				width: window.innerWidth,
			},
		};
	}
	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	demoModeCallback = isactive => {
		let state = Object.assign({}, this.state);
		if (isactive) {
			state.building = compileBuilding(demobuilding);
			state.isDemoMode = isactive;
			this.setState(state);
		} else {
			state.building = compileBuilding(defaultbuilding);
			state.isDemoMode = isactive;
			this.setState(state);
		}
	};

	inputCallback = building => {
		let state = Object.assign({}, this.state);
		let compiled = compileBuilding(building);
		state.building = compiled;
		state.isDemoMode = false;
		this.setState(state);
	};

	hideModal = () => {
		let state = Object.assign({}, this.state);
		state.modalactive = false;
		this.setState(state);
	};

	showModal = () => {
		let state = Object.assign({}, this.state);
		state.modalactive = true;
		this.setState(state);
	};
	disableDemo = () => {
		let state = Object.assign({}, this.state);
		state.isDemoMode = false;
		this.setState(state);
	};

	handleResize = () => {
		let state = Object.assign({}, this.state);
		state.dims = {
			height: window.innerHeight,
			width: window.innerWidth,
		};
		this.setState(state);
	};

	render() {
		let { width, height } = this.state.dims;
		let isSmallScreen = false;
		if (width < 750 || height < 500) {
			isSmallScreen = true;
		}

		return (
			<React.Fragment>
				<Modal isactive={this.state.modalactive} callback={this.hideModal} />
				<SmallScreen visible={isSmallScreen} />
				<div className="main-container">
					<Header
						isDemoMode={this.state.isDemoMode}
						demoModeCallback={this.demoModeCallback}
						modalcallback={this.showModal}
					></Header>
					<Sidebar
						disableDemoCallback={this.disableDemo}
						isDemoMode={this.state.isDemoMode}
						demobuilding={demobuilding}
						defaultbuilding={defaultbuilding}
						callback={this.inputCallback}
						modalcallback={this.showModal}
					></Sidebar>
					<CardLayout building={this.state.building}></CardLayout>
				</div>
				<Footer modalcallback={this.showModal}></Footer>
			</React.Fragment>
		);
	}
}

export default App;
