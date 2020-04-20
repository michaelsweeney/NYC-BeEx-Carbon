import React from 'react';
import { Sidebar } from './sidebar.js'
import { Header } from './header.js'
import { CardLayout } from './cardlayout'
import { Footer } from './footer.js'

import {defaultbuilding} from './defaultbuilding.js'
import {compileBuilding} from './compilebuilding.js'



class MainLayout extends React.Component {
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
  }
 
  render() {
    return (
      <div className='main-container'>
        <Sidebar defaultbuilding={defaultbuilding} callback={this.inputCallback}></Sidebar>
        {/* <Header></Header> */}
        <CardLayout building={this.state.building}></CardLayout>
        <Footer></Footer>
      </div>
    )
  }
}


// class MainLayout extends React.Component {
//   constructor(props) {
//     super(props)

//   }

//   render() {
//     return (
//       <div>test2</div>
//     )
//   }
// }


export { MainLayout }