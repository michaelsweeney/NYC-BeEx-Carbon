
import React from 'react';
import { AnnualCostSummaryContainer } from './annualcostsummarycontainer.js'
import { CarbonLimitContainer } from './carbonlimitcontainer.js'
import { BuildingMetricContainer } from './buildingmetriccontainer.js'
import { Footer } from './footer.js'




class MainLayout extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    let { building } = this.props;
    return (
      <div className='content-layout'>
        <div className='top-row'>
          <div className='carbon-bar-card'>
            <CarbonLimitContainer building={building}></CarbonLimitContainer>
          </div>
        </div>
        <div className='bottom-row'>
          <div className='left-bottom cost-card'>
            <AnnualCostSummaryContainer building={building}></AnnualCostSummaryContainer>
          </div>
          <div className='right-bottom donut-card'>
            <BuildingMetricContainer building={building}></BuildingMetricContainer>
          </div>
        </div>
      </div>
    )
  }
}



// // original layout - 1 left / 2 right cards
// class MainLayout extends React.Component {
//   constructor(props) {
//     super(props)

//   }

//   render() {

//     let {building} = this.props;
//     return (
//       <div className='content-layout'>
//         <div className='left-column carbon-bar-container'>
//           <CarbonLimitContainer building={building}></CarbonLimitContainer>
//         </div>
//         <div className='right-column'>
//           <div className='top-right pie-container'>
//             <BuildingMetricContainer building={building}></BuildingMetricContainer>
//           </div>
//           <div className='bottom-right cost-container'>
//             <AnnualCostSummaryContainer building={building}></AnnualCostSummaryContainer>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }


export { MainLayout }