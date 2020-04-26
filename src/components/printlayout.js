import React from 'react';
import { BeExLogo } from './beexlogo.js';
import { formatInt } from './numformat.js'

import { PrintCardLayout } from './printcardlayout'


class PrintLayout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    let { summary, utilities } = this.props.building

    return (
      <div className='print-layout'>


        <div className='head-text-1'> NYC LL97 Carbon Calculator Report</div>


        <div className='print-bldg-inputs-container'>
          <div className='head-text-2'>Building Information</div>

          <ul className = 'print-input-li'>

          <li><u>Total Building Area:</u> {formatInt(summary.total_area)} SF</li>
          <li><u>Total Building Carbon:</u> {formatInt(summary.total_carbon)} tons CO2</li>        
          <li><u>Total Building Utility Cost:</u> ${formatInt(summary.total_cost)}</li>     
          <li><u>Annual Fine, 2024-2029:</u> ${formatInt(summary.fine_2024)}</li>        
          <li><u>Annual Fine, 2030-2034:</u> ${formatInt(summary.fine_2030)}</li>        
          <li><u>Annual Fine, 2035+:</u> ${formatInt(summary.fine_2035)}*</li>        
          </ul>

          <div className='print-fine-caveats head-text-4'>
          <p>
          Carbon Fines, especially for periods 2035 and up, are subject to change and are only 
          examples
          Rule-making will impact how law impacts individual buildings.
          </p>
          </div>o
          {/* // co2limit_2024: 0
    // co2limit_2030: 0
    // co2limit_2035: 0
    // fine_2024: 7949.67788202632
    // fine_2030: 7949.67788202632
    // fine_2035: 7949.67788202632
    // total_area: 0
    // total_carbon: 29.66297717174
    // total_cost: 0



    // carbon: {elec: 0.16037217173999999, gas: 29.502605, steam: 0, fuel_two: 0, fuel_four: 0}
    // carbon_sf: {elec: Infinity, gas: Infinity, steam: NaN, fuel_two: NaN, fuel_four: NaN}
    // cost: {elec: 0, gas: 0, steam: 0, fuel_two: 0, fuel_four: 0}
    // cost_sf: {elec: NaN, gas: NaN, steam: NaN, fuel_two: NaN, fuel_four: NaN}
    // kbtu: {elec: 1893.6599999999999, gas: 555500, steam: 0, fuel_two: 0, fuel_four: 0}
    // kbtu_sf: {elec: Infinity, gas: Infinity, steam: NaN, fuel_two: NaN, fuel_four: NaN}
    // native: {elec: 555, gas: 5555, steam: 0, fuel_two: 0, fuel_four: 0}
    // rates: {elec: 0, gas */}



        </div>




        <div className='print-cards-container'>
          <div className='head-text-2'>Carbon, Energy and Cost Summaries</div>
          <PrintCardLayout building={this.props.building}></PrintCardLayout>

        </div>





        <div className='print-logos'>
          <a className='logo-nyc' href="https://retrofitaccelerator.cityofnewyork.us/" target="_blank" rel="noopener noreferrer">
            <img src='ACCELERATOR-WHITE.png' height='60' width='100'></img>
          </a>
          <a className='logo-beex' href="http://www.be-exchange.org" target="_blank" rel="noopener noreferrer">
            <BeExLogo></BeExLogo>

          </a>
          <a className='logo-akf' href="http://www.akfgroup.com" target="_blank" rel="noopener noreferrer">
            >
            <img src='logo-akf.jpg' height='50' width='90'></img>
          </a>
        </div>
      </div>
    )
  }
}

export { PrintLayout }