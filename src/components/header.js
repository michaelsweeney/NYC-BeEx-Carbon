import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div className='header'>
      <img src='logo-akf.jpg' height = '60' width = '100'></img>
      <img src='ACCELERATOR-WHITE.png' height = '60' width = '100'></img>
      <img src='beex.png' height = '60' width = '100'></img>
      </div>
    )
  }
}


export { Header }