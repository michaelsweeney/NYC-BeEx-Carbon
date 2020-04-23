import React from 'react';
import { BeExLogo } from './beexlogo.js';

class PrintLayout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    let {summary, utilities} = this.props.building

    console.log(summary)
    console.log(utilities)
    return (
      <div className='print-layout'>


        <div className='head-text-1'> NYC LL97 Carbon Calculator Report</div>


        <div className='print-bldg-inputs-container'>
          <div className='head-text-2'>Building Inputs</div>
        </div>




        <div className='print-cards-container'>
          <div className='head-text-2'>Building Inputs</div>

        </div>





        <div className='print-logos'>
          <a href="https://retrofitaccelerator.cityofnewyork.us/" target="_blank">
            <img src='ACCELERATOR-WHITE.png' height='60' width='100'></img>
          </a>
          <a href="http://www.be-exchange.org" target="_blank">
            <BeExLogo></BeExLogo>

          </a>
          <a href="http://www.akfgroup.com" target="_blank">
            <img src='logo-akf.jpg' height='60' width='100'></img>
          </a>
        </div>
      </div>
    )
  }
}

export { PrintLayout }