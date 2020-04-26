import React from 'react';

const radius = 75,
  innerRadius = 50,
  animation = true,
  width = 200,
  height = 200;





class DonutChart extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    let data = this.props.data;

    const datavals = [
      { angle: data.elec.val },
      { angle: data.gas.val },
      { angle: data.steam.val },
      { angle: data.fuel_two.val },
      { angle: data.fuel_four.val }
    ]
    return (
      <div className='chart-div'>

        <rv.RadialChart
          animation={animation}
          radius={radius}
          innerRadius={innerRadius}
          data={datavals}
          width={width}
          height={height}
          onSeriesClick={(event) => {
          }}
        >
          <rv.ChartLabel
            text={this.props.title}
            className="title"
            includeMargin={true}
            xPercent={.3}
            yPercent={0.1}
          ></rv.ChartLabel>



        </rv.RadialChart>


      </div>
    )
    // return (
    //   <div>
    //     Building Summary:
    //     <ul>
    //       {bldgstrings.map((key) => {
    //         let val = bldg[key]
    //         return <li key={key}>{key}:{val}</li>
    //       })}
    //     </ul>
    //   </div>
    // )
  }
}


export { DonutChart }