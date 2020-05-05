
import React from 'react';

import { formatInt } from './numformat.js'
import { CarbonBar } from './charts/carbonbar.js'

class CarbonLimitContainer extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.normalizeRects()
    }

    componentDidUpdate() {
        this.normalizeRects()
    }

    normalizeRects() {
        let rectswidth = 0;
        this.container.querySelectorAll('.carbon-summary-text').forEach((node) => {
            rectswidth = Math.max(rectswidth, node.getBoundingClientRect().width)
        })

        if (rectswidth != 0) {
            this.container.querySelectorAll('.carbon-summary-text').forEach((node) => {
                node.setAttribute('width', rectswidth)
            })
        }



    }
    render() {

        let { summary } = this.props.building;
        let carbondata = {
            total_carbon: summary.total_carbon,
            total_area: summary.total_area,
            co2limit_2024: summary.co2limit_2024,
            co2limit_2030: summary.co2limit_2030,
            co2limit_2035: summary.co2limit_2035,
            fine_2024: summary.fine_2024,
            fine_2030: summary.fine_2030,
            fine_2035: summary.fine_2035,
        }

        carbondata['carbon_norm'] = carbondata.total_carbon / carbondata.total_area

        return (
            <div className='carbon-main-container'>
                <div className='container-header'>Carbon Threshold Summary</div>
                <div ref = {container => this.container = container} className='carbon-summary-card'>
                    {/* <div className='carbon-summary-head'>Carbon Footprint</div> */}
                    <div className='carbon-summary-val'>{formatInt(carbondata.total_carbon)}</div>
                    <div className='carbon-summary-text'>tCO2e/yr</div>
                    <div className='carbon-summary-val'>{formatInt(carbondata.carbon_norm)}</div>
                    <div className='carbon-summary-text'>tCO2/sf/yr</div>
                </div>

                <CarbonBar carbondata={carbondata}></CarbonBar>
            </div>
        )
    }
}


export { CarbonLimitContainer }