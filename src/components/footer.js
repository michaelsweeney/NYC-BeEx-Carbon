import React from 'react';

import {BeExLogo} from './beexlogo.js'


class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div className='footer'>
        <div className='footer-copy'>
          <div className='head'> A NYC Accelerator Production</div>
          <div className='mid'>Powered by Building Energy Exchange and AKF Group</div>
        </div>


        <div className='footer-logos'>

          <a className='logo-nyc' href="https://retrofitaccelerator.cityofnewyork.us/" target="_blank" rel="noopener noreferrer">
            <img src='ACCELERATOR-WHITE.png' height='60' width='100'></img>
          </a>
          <a className='logo-beex' href="http://www.be-exchange.org" target="_blank" rel="noopener noreferrer">
            <BeExLogo></BeExLogo>

          </a>
          <a className='logo-akf' href="http://www.akfgroup.com" target="_blank" rel="noopener noreferrer">
            <img src='logo-akf.jpg' height='50' width='90'></img>
          </a>

        </div>

      </div>
    )
  }
}






export { Footer }