
import React from 'react';
import {AnnualCostSummaryContainer} from './annualcostsummarycontainer.js'
import {CarbonLimitContainer} from './carbonlimitcontainer.js'
import {BuildingMetricContainer} from './buildingmetriccontainer.js'










class MainLayout extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {

    let {building} = this.props;
    return (
      <div className='content-layout'>
        <div className='left-column carbon-bar-container'>
          <CarbonLimitContainer building={building}></CarbonLimitContainer>
        </div>
        <div className='right-column'>
          <div className='top-right pie-container'>
            <BuildingMetricContainer building={building}></BuildingMetricContainer>
          </div>
          <div className='bottom-right cost-container'>
            <AnnualCostSummaryContainer building={building}></AnnualCostSummaryContainer>
          </div>
        </div>
      </div>
    )
  }
}


export { MainLayout }