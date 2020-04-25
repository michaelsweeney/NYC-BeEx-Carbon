import React from 'react';
import { Sidebar } from '../sidebar.js'
import { CardLayout } from '../cardlayout'
import { Footer } from '../footer.js'
import { Modal } from '../modal.js'
import { defaultbuilding } from '../defaultbuilding.js'
import { compileBuilding } from '../compilebuilding.js'
import { PrintLayout } from '../printlayout.js'


class MainLayout extends React.Component {
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
    console.log(this.state.building)
    return (
      <React.Fragment>
        {/* <Modal isactive={this.state.modalactive} callback={this.hideModal}></Modal> */}
        <div className="main-container">
          <Sidebar defaultbuilding={defaultbuilding} callback={this.inputCallback} modalcallback = {this.showModal}></Sidebar>
          {/* <Header></Header> */}
          <CardLayout building={this.state.building}></CardLayout>
          <Footer></Footer>
        </div>
        <PrintLayout building={this.state.building}></PrintLayout>
      </React.Fragment>

    )
  }
}



export { MainLayout }