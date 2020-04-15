import React from 'react';

import {
  nest,
  select,
  selectAll,
  scaleOrdinal,
  pie,
  arc,
  interpolateObject,
  interpolate
} from 'd3'







class DonutLegend extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.createLegend()
  }
  componentDidUpdate() {
    this.createLegend()
  }

  createLegend() {

    let colorlookups = {
      'Electricity': "#358FB4",
      'Gas': "#6EB12C",
      'Steam': "#B23232",
      'Fuel Two': "#A644E2",
      'Fuel Four': "#62009E"
    }

    let width = 300
    let height = 200

    let svg = select(this.container).selectAll('svg').data([0]).join('svg')
    svg
      .attr('width', width)
      .attr('height', height)

    let g = svg.selectAll('g').data([0]).join('g')
    g.attr('transform', `translate(0,10)`)

    let rects = g.selectAll('rect')
    .data(Object.keys(colorlookups)).join('rect')

    rects
      .attr('fill', (d, i) => colorlookups[d])
      .attr('x', 50)
      .attr('y', (d, i) => { console.log(d); return i * 30 })
      .attr('width', 18)
      .attr('height', 18)

    let text = g.selectAll('text')
    .data(Object.keys(colorlookups)).join('text')

    text
      .text(d => d)
      .attr('x', 75)
      .attr('y', (d, i) => { return (i * 30) + 9 })
      .attr('font-size', 14)




  }












  render() {
    return (
      <div className='donut-legend-container' ref={container => this.container = container}></div>
    )
  }
}










export { DonutLegend }
