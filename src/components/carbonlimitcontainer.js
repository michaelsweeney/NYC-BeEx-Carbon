
import React from 'react';


import {formatInt} from './numformat.js'
import {CarbonBar} from './carbonbar.js'




class CarbonLimitContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        let { summary } = this.props.building;
        let carbondata = {
            total_carbon: summary.total_carbon,
            co2limit_2024: summary.co2limit_2024,
            co2limit_2030: summary.co2limit_2030,
            co2limit_2035: summary.co2limit_2035,
            fine_2024: summary.fine_2024,
            fine_2030: summary.fine_2030,
            fine_2035: summary.fine_2035
        }
        
        let config = {} // optional for overriding defaults in render

        return <div>
            <div className='container-header'>Carbon Summary</div>
            <CarbonBar carbondata={carbondata} config={config}></CarbonBar>
        </div>
    }
}


// // vertical container
// class CarbonLimitContainer extends React.Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {

//         let { summary } = this.props.building;
//         let carbondata = {
//             total_carbon: summary.total_carbon,
//             co2limit_2024: summary.co2limit_2024,
//             co2limit_2030: summary.co2limit_2030,
//             co2limit_2035: summary.co2limit_2035,
//             fine_2024: summary.fine_2024,
//             fine_2030: summary.fine_2030,
//             fine_2035: summary.fine_2035
//         }
        
//         let config = {} // optional for overriding defaults in render

//         return <div>
//             <div className='container-header'>Carbon Limits</div>
//             <div>Your building's footprint is</div>
//             <div className='footprint-icon'>{formatInt(+summary.total_carbon)}</div>
//             <div>tCO2 per year</div>

//             <CarbonBar carbondata={carbondata} config={config}></CarbonBar>
//         </div>
//     }
// }

export { CarbonLimitContainer }