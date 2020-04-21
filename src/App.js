import React from 'react';
import { MainLayout } from './components/mainlayout.js'

import './App.css';
import './css/sidebar.css';
import './css/mainlayout.css';
import './css/footer.css';
import './css/chart.css'; 
import './css/printlayout.css';

// import { TestSpace } from './testspace.js'



function App() {
  return (
    <React.Fragment>
      <MainLayout></MainLayout>
    </React.Fragment>
  )
}





// class testApp extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       data: [
//         {
//           utility: 'Electricity',
//           val: 200
//         },
//         {
//           utility: 'Gas',
//           val: 200
//         },
//         {
//           utility: 'Steam',
//           val: 200
//         },
//         {
//           utility: 'Fuel_Two',
//           val: 200
//         },
//         {
//           utility: 'Fuel_Four',
//           val: 200
//         },
//       ]
//     }
//     this.setTimer()
//   }

//   setTimer() {
//     setInterval(() => {
//       let newstate = Object.assign({}, this.state)
//       newstate.data.forEach((obj) => {
//         obj.val = Math.random() * Math.round(Math.random())
//       })
//       this.setState(newstate)
//     }, 1000)

//   }
//   render() {
//     return (
//       <React.Fragment>
//         <TestSpace data={this.state.data}></TestSpace>
//         <TestSpace data={this.state.data}></TestSpace>
//         <TestSpace data={this.state.data}></TestSpace>
//       </React.Fragment>

//     )
//   }

// }







export default App;
