import { DonutChart } from './donutchart.js'
import React from 'react';



// formatter for donut charts
const donutobj = (building, normalized) => {
    let ghg = {}
    let cost = {}
    let energy = {}

    if (normalized) {
        cost = {
            elec: {
                title: 'Elec',
                val: building['elec_cost_per_sf'],
                units: '($/sf/yr)',
            },
            gas: {
                title: 'Gas',
                val: building['gas_cost_per_sf'],
                units: '$/sf/yr',
            },
            steam: {
                title: 'Steam',
                val: building['steam_cost_per_sf'],
                units: '$/sf/yr',
            },
            fuel_two: {
                title: 'Fuel Oil 2',
                val: building['fuel_two_cost_per_sf'],
                units: '$/sf/yr',
            },
            fuel_four: {
                title: 'Fuel Oil 4',
                val: building['fuel_four_cost_per_sf'],
                units: '$/sf/yr',
            }
        }
    }

    else {
        cost = {
            elec: {
                title: 'Elec',
                val: building['elec_cost'],
                units: '$',
            },
            gas: {
                title: 'Gas',
                val: building['gas_cost'],
                units: '$',
            },
            steam: {
                title: 'Steam',
                val: building['steam_cost'],
                units: '$',
            },
            fuel_two: {
                title: 'Fuel Oil 2',
                val: building['fuel_two_cost'],
                units: '$',
            },
            fuel_four: {
                title: 'Fuel Oil 4',
                val: building['fuel_four_cost'],
                units: '$',
            }
        }
    }



    if (normalized) {
        ghg = {
            elec: {
                title: 'Elec',
                val: building['elec_carbon_per_sf'],
                units: 'tCO2/sf/yr',
            },
            gas: {
                title: 'Gas',
                val: building['gas_carbon_per_sf'],
                units: 'tCO2/sf/yr',
            },
            steam: {
                title: 'Steam',
                val: building['steam_carbon_per_sf'],
                units: 'tCO2/sf/yr',
            },
            fuel_two: {
                title: 'Fuel Oil 2',
                val: building['fuel_two_carbon_per_sf'],
                units: 'tCO2/sf/yr',
            },
            fuel_four: {
                title: 'Fuel Oil 4',
                val: building['fuel_four_carbon_per_sf'],
                units: 'tCO2/sf/yr',
            }
        }
    }

    else {
        ghg = {
            elec: {
                title: 'Elec',
                val: building['elec_carbon'],
                units: 'tCO2',
            },
            gas: {
                title: 'Gas',
                val: building['gas_carbon'],
                units: 'tCO2',
            },
            steam: {
                title: 'Steam',
                val: building['steam_carbon'],
                units: 'tCO2',
            },
            fuel_two: {
                title: 'Fuel Oil 2',
                val: building['fuel_two_carbon'],
                units: 'tCO2',
            },
            fuel_four: {
                title: 'Fuel Oil 4',
                val: building['fuel_four_carbon'],
                units: 'tCO2',
            }
        }
    }


    if (normalized) {
        energy = {
            elec: {
                title: 'Elec',
                val: building['elec_eui'],
                units: 'kBtu/sf/yr',
            },
            gas: {
                title: 'Gas',
                val: building['gas_eui'],
                units: 'kBtu/sf/yr',
            },
            steam: {
                title: 'Steam',
                val: building['steam_eui'],
                units: 'kBtu/sf/yr',
            },
            fuel_two: {
                title: 'Fuel Oil 2',
                val: building['fuel_two_eui'],
                units: 'kBtu/sf/yr',
            },
            fuel_four: {
                title: 'Fuel Oil 4',
                val: building['fuel_four_eui'],
                units: 'kBtu/sf/yr',
            }
        }
    }

    else {
        energy = {
            elec: {
                title: 'Elec',
                val: building['elec_kbtu'],
                units: 'kBtu',
            },
            gas: {
                title: 'Gas',
                val: building['gas_kbtu'],
                units: 'kBtu',
            },
            steam: {
                title: 'Steam',
                val: building['steam_kbtu'],
                units: 'kBtu',
            },
            fuel_two: {
                title: 'Fuel Oil 2',
                val: building['fuel_two_kbtu'],
                units: 'kBtu',
            },
            fuel_four: {
                title: 'Fuel Oil 4',
                val: building['fuel_four_kbtu'],
                units: 'kBtu',
            }
        }
    }

    return { ghg: ghg, cost: cost, energy: energy }
}







class DonutContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            normalized: false,
        }
    }
    render() {
        let normalized = this.state.normalized
        let building = this.props.building

        let { ghg, cost, energy } = donutobj(building, normalized)


        return (
            <div className='donut-container'>
                <DonutChart
                    title={normalized ? 'Cost/sf/yr ($)' : 'Cost ($)'}
                    data={cost}
                ></DonutChart>

                <DonutChart
                    title={normalized ? 'ghg/sf/yr (tCO2/sf)' : 'Annual GHG (tCO2)'}
                    data={ghg}
                ></DonutChart>

                <DonutChart
                    title={normalized ? 'Annual EUI (kBtu/sf/yr)' : 'Annual Site Energy (kBtu)'}
                    data={energy}
                ></DonutChart>
                <button onClick={this.toggleNorm}>{normalized ? "Area Normalized" : "Total Annual"}</button>
            </div >
        )
    }
    toggleNorm = () => {
        this.setState({ normalized: !this.state.normalized })
    }
}


export { DonutContainer }