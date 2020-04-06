
import React from 'react';
import { HelpOutline } from '@material-ui/icons';
import { UtilityInput } from './utilityinput.js'
import { BuildingType } from './buildingtype.js'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.defaultbuilding
  }


  useDefaultRates = () => {
    let state = Object.assign({}, this.state)
    state.utilities.elec.rate = '0.22'
    state.utilities.gas.rate = '0.997'
    state.utilities.steam.rate = '35'
    state.utilities.fuel_two.rate = '1.65'
    state.utilities.fuel_four.rate = '1.65'
    this.setState(state)
    this.props.callback(state)
  }

  handleUtilityChange = (e) => {
    let value = e.target.value
    let [fuel, type] = e.target.getAttribute('datatag').split('-')
    let state = Object.assign({}, this.state)
    state.utilities[fuel][type] = value
    this.setState(state)
    this.props.callback(state)

  }


  handleBuildingTypeChange = (e) => {

    let state = Object.assign({}, this.state)
    let value = e.target.value
    let bldgtypeid = e.target.getAttribute('datatag')
    let inputtype = e.target.type

    let subkey;
    if (inputtype == 'select-one') { subkey = 'type' }
    if (inputtype == 'number') { subkey = 'area' }

    state.types[bldgtypeid][subkey] = value

    this.setState(state)
    this.props.callback(state)
  }

  removeBuildingType = (e) => {
    let toremove = e.target.getAttribute('dataremove')
    let state = Object.assign({}, this.state)
    delete state.types[toremove]

    this.setState(state)
    this.props.callback(state)
  };

  addBuildingType = () => {
    let state = Object.assign({}, this.state)
    let numtypes = Object.keys(state.types).length
    let nextid = numtypes + 1

    while (nextid in state.types) {
      nextid++
    }
    console.log(nextid)
    state.types[nextid] = {
      type: 'A',
      area: 0,
      id: nextid
    }
    this.setState(state)
    this.props.callback(state)
  }

  render() {

    return (
      <div className='sidebar'>

        <div className='sidebar-text-1'>
          <div className='sidebar-header'>NYC LL97</div>
          <div className='sidebar-header'>Carbon Emissions</div>
          <div className='sidebar-header'>Calculator</div>
        </div>

        <div className='sidebar-text-2'>Building Inputs
        <HelpOutline style={{ color: 'rgb(184,215,52)', width: '20px', height: '20px', marginLeft: '10px' }}></HelpOutline>
        </div>
        <div className='bldg-input-main-container'>

          {Object.keys(this.state.types).map((id) => {
            return (
              <React.Fragment key={id}>
                <BuildingType
                  typenum={id}
                  removeCallback={this.removeBuildingType}
                  updateCallback={this.handleBuildingTypeChange}
                ></BuildingType>
              </React.Fragment>
            )
          })}

          <button className='add-building-type-btn sidebar-btn' onClick={this.addBuildingType}>ADD BUILDING TYPE</button>
        </div>
        <div className='sidebar-text-2'>Utility Inputs
          <HelpOutline style={{ color: 'rgb(184,215,52)', width: '20px', height: '20px', marginLeft: '10px' }}></HelpOutline>
        </div>

        <div className='utility-input-main-container'>

          <UtilityInput
            title='Electricity'
            cons_title='kWh'
            utiltag='elec'
            cost_title='$/kWh'
            vals={this.state.utilities.elec}
            callback={this.handleUtilityChange}
          ></UtilityInput>

          <UtilityInput
            title='Natural Gas'
            cons_title='therms'
            utiltag='gas'
            cost_title='$/therm'
            vals={this.state.utilities.gas}
            callback={this.handleUtilityChange}
          ></UtilityInput>

          <UtilityInput
            title='Steam'
            cons_title='mLbs'
            utiltag='steam'
            cost_title='$/mLb'
            vals={this.state.utilities.steam}
            callback={this.handleUtilityChange}
          ></UtilityInput>

          <UtilityInput
            title='Fuel Oil 2'
            cons_title='gal'
            utiltag='fuel_two'
            cost_title='$/gal'
            default_rate='1.65'
            vals={this.state.utilities.fuel_two}
            callback={this.handleUtilityChange}
          ></UtilityInput>

          <UtilityInput
            title='Fuel Oil 4'
            cons_title='gal'
            utiltag='fuel_four'
            cost_title='$/gal'
            default_rate='1.65'
            vals={this.state.utilities.fuel_four}
            callback={this.handleUtilityChange}
          ></UtilityInput>

          <button className='default-rate-btn sidebar-btn' onClick={this.useDefaultRates}>USE DEFAULT RATES</button>

        </div>
      </div>
    )
  }
}







export { Sidebar }