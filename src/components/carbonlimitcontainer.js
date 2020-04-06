
import React from 'react';


import {formatInt} from './numformat.js'


class CarbonLimitContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        let { building } = this.props;

        let {
            total_carbon,
            co2limit_2024,
            co2limit_2030,
            co2limit_2035,
            fine_2024,
            fine_2030,
            fine_2035
        } = building.summary

        return <div>
            <div className='container-header'>Carbon Limits</div>
            <div>Your building's footprint is</div>
            <div className='footprint-icon'>{formatInt(+total_carbon)}</div>
            <div>tCO2 per year</div>

            <div>{`2024 limit: ${formatInt(+co2limit_2024)}`}</div>
            <div>{`2030 limit: ${formatInt(+co2limit_2030)}`}</div>
            <div>{`2024 limit: ${formatInt(+co2limit_2035)}`}</div>
            <div>{`2024 fine: ${formatInt(+fine_2024)}`}</div>
            <div>{`2030 fine: ${formatInt(+fine_2030)}`}</div>
            <div>{`2024 fine: ${formatInt(+fine_2035)}`}</div>

        </div>
    }
}

export { CarbonLimitContainer }