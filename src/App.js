import React from 'react';
import { Sidebar } from './components/sidebar.js'
import { CardLayout } from './components/cardlayout'
import { Header } from './components/header.js'
import { Modal } from './components/modal.js'
import { defaultbuilding } from './components/defaultbuilding.js'
import { compileBuilding } from './components/compilebuilding.js'
import { PrintLayout } from './components/printlayout.js'
import { Footer } from './components/footer.js'

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
    super(props)
    this.state = {
      building: compileBuilding(defaultbuilding),
      modalactive: true,
    }
  }

  inputCallback = (building) => {
    let state = Object.assign({}, this.state)
    let compiled = compileBuilding(building)
    state.building = compiled;
    this.setState(state)
  }

  componentDidUpdate() {
  }

  hideModal = () => {
    let state = Object.assign({}, this.state)
    state.modalactive = false
    this.setState(state)
  }

  showModal = () => {
    let state = Object.assign({}, this.state)
    state.modalactive = true
    this.setState(state)
  }

  render() {
    return (
      <React.Fragment>
        {/* <Modal isactive={this.state.modalactive} callback={this.hideModal}></Modal> */}
        <div className="main-container">
        <Header modalcallback = {this.showModal}></Header>
          <Sidebar defaultbuilding={defaultbuilding} callback={this.inputCallback} modalcallback = {this.showModal}></Sidebar>
          <CardLayout building={this.state.building}></CardLayout>
        </div>
        <Footer modalcallback = {this.showModal}></Footer>
        {/* <PrintLayout building={this.state.building}></PrintLayout> */}
      </React.Fragment>

    )
  }
}

export default App;
