import React from 'react';
import {
    select,
} from 'd3'
import { formatInt } from '../numformat.js'

class CarbonSummary extends React.Component {
    constructor(props) {
        super(props)
        this.addResize()
    }
    componentDidMount() {
        this.createBarChart({})
    }
    componentDidUpdate() {
        this.createBarChart({})
    }
    addResize() {
        window.addEventListener('resize', () => {
            this.createBarChart({})
        })
    }
    createBarChart = (props) => {
        // parse data
        let {
            total_carbon,
            total_area,
        } = this.props.carbondata

        let norm_carbon = total_carbon / total_area

        let divheightoffset = 48;
        let divwidthoffset = 28;
        let divdims = this.container.getBoundingClientRect()

        let width = divdims.width - divwidthoffset;
        let height = divdims.height - divheightoffset;

        let margins = {
            t: 0,
            b: 0,
            r: 0,
            l: 0
        }
        
        let textoffsety = 5;
        let boxspacing = 20
        let boxheight = 40

        let svg = select(this.container).selectAll('svg').data([0]).join('svg')
            .attr('width', width).attr('height', height)
            .attr('transform', `translate(${margins.l}, ${margins.t})`)

        /* --- MAIN ICON CONTAINER --- */
        let carbonheader = svg.selectAll('.carbonheader')
            .data([0]).join('g')
            .attr('class', 'carbonheader')
            .attr('transform', `translate(0, ${textoffsety})`)

        let iconcontainer = carbonheader.selectAll('.iconcontainer')
            .data([0]).join('g')
            .attr('class', 'iconcontainer')


        let iconrect = iconcontainer.selectAll('rect')
            .data([total_carbon, norm_carbon]).join('rect')
            .attr('y', (d, i) => (i) * boxspacing)
            .attr('width', 40)
            .attr('height', boxheight)
            .attr('rx', '8px')
            .attr('ry', '8px')
            .attr('fill', '#BAD636')
            .style('border-color', '#D2D2D2')
            .style('border-width', '1px')
            .style('border-style', 'solid')

        let icontext = iconcontainer.selectAll('text')
            .data([total_carbon, norm_carbon]).join('text')
            .attr('class', 'head-text-2')
            .attr('y', (d, i) => i * boxspacing + boxheight / 2)
            .attr('x', 20)
            .text((d, i) => {
                if (i == 0) {
                    return formatInt(total_carbon) + ' tCO2/yr'
                }
                if (i == 1) {
                    return formatInt(norm_carbon) + ' tCO2/sf/yr'
                }
            })
            .style('fill', 'black')
            .style('font-family', 'CircularStd-Bold')
            .style('font-size', '18px')
        
        // iconrect
        //     .attr('width', () => icontext.node().getBBox().width + 40)

    }
    render() {
        return (
            <div className='carbon-summary-card' ref={container => this.container = container}></div>
        )
    }
}



export { CarbonSummary }