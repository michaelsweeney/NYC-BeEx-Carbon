import React from 'react';

// import BarChart from './barchart.js'
import {formatInt} from './numformat.js'


class AnnualCostSummaryContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let {
      total_cost,
      fine_2024,
      fine_2030,
      fine_2035 } = this.props.building.summary

    return (
      <React.Fragment>
        <div className='container-header'>Annual Cost Summary</div>
        <div>{`Total Cost: ${formatInt(+total_cost)}`}</div>
        <div>{`2024 fine: ${formatInt(+fine_2024)}`}</div>
        <div>{`2030 fine: ${formatInt(+fine_2030)}`}</div>
        <div>{`2035 fine: ${formatInt(+fine_2035)}`}</div>
      </React.Fragment>
    )
  }
}



export { AnnualCostSummaryContainer }