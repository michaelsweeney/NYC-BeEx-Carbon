import React from 'react'
import { formatInt } from './numformat.js'
import { DonutChart } from './donutchart.js'
import {DonutLegend} from './donutlegend.js'

class BuildingMetricContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        let {
            kbtu,
            cost,
            carbon,
            kbtu_sf,
            cost_sf,
            carbon_sf,
        } = this.props.building.utilities

        


        let costdata = [
            {
                utility: 'Electricity',
                val: cost.elec,
                val_norm: cost_sf.elec
            },
            {
                utility: 'Gas',
                val: cost.gas,
                val_norm: cost_sf.gas
            },
            {
                utility: 'Steam',
                val: cost.steam,
                val_norm: cost_sf.steam
            },
            {
                utility: 'Fuel Two',
                val: cost.fuel_two,
                val_norm: cost_sf.fuel_two
            },
            {
                utility: 'Fuel Four',
                val: cost.fuel_four,
                val_norm: cost_sf.fuel_four
            },
        ]

        let energydata = [
            {
                utility: 'Electricity',
                val: kbtu.elec,
                val_norm: kbtu_sf.elec
            },
            {
                utility: 'Gas',
                val: kbtu.gas,
                val_norm: cost_sf.gas
            },
            {
                utility: 'Steam',
                val: kbtu.steam,
                val_norm: cost_sf.steam
            },
            {
                utility: 'Fuel Two',
                val: kbtu.fuel_two,
                val_norm: kbtu_sf.fuel_two
            },
            {
                utility: 'Fuel Four',
                val: kbtu.fuel_four,
                val_norm: kbtu_sf.fuel_four
            },
        ]

        let carbondata = [
            {
                utility: 'Electricity',
                val: carbon.elec,
                val_norm: carbon_sf.elec
            },
            {
                utility: 'Gas',
                val: carbon.gas,
                val_norm: carbon_sf.gas
            },
            {
                utility: 'Steam',
                val: carbon.steam,
                val_norm: carbon_sf.steam
            },
            {
                utility: 'Fuel Two',
                val: carbon.fuel_two,
                val_norm: carbon_sf.fuel_two
            },
            {
                utility: 'Fuel Four',
                val: carbon.fuel_four,
                val_norm: carbon_sf.fuel_four
            },
        ]

        return (
            <React.Fragment>
                <div className='container-header'>Building Metrics</div>
                <DonutChart title={'Cost'} donutprops={costdata}></DonutChart>
                <DonutChart title={'Energy'} donutprops={energydata}></DonutChart>
                <DonutChart title={'Carbon'} donutprops={carbondata}></DonutChart>
                <DonutLegend></DonutLegend>
            </React.Fragment>
        )

    }

}


export { BuildingMetricContainer }