import React from 'react';
import { Sidebar } from './sidebar.js'
import { Header } from './header.js'
import { MainLayout } from './mainlayout.js'
import { Footer } from './footer.js'

import {defaultbuilding} from './defaultbuilding.js'
import {compileBuilding} from './compilebuilding.js'



class DataControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      building: compileBuilding(defaultbuilding)
    }
  }

  inputCallback = (building) => {
    let compiled = compileBuilding(building)
    this.setState({building: compiled})
  }

  componentDidUpdate() {
    // console.log(this.state)
  }

  render() {
    return (
      <div className='main-container'>
        <Sidebar defaultbuilding={defaultbuilding} callback={this.inputCallback}></Sidebar>
        <Header></Header>
        <MainLayout building={this.state.building}></MainLayout>
        <Footer></Footer>
      </div>
    )
  }

}

export { DataControl }