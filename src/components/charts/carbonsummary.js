import React from 'react';
import {
    max,
    scaleLinear,
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
            co2limit_2024,
            co2limit_2030,
            co2limit_2035,
            fine_2024,
            fine_2030,
            fine_2035,
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
        let textoffsety = 15;

        let linedata = [
            {
                thresh: co2limit_2035,
                fine: fine_2035,
                key: '2035'
            },
            {
                thresh: co2limit_2030,
                fine: fine_2030,
                key: '2030'
            },
            {
                thresh: co2limit_2024,
                fine: fine_2024,
                key: '2024'
            },
        ]

        let colors = { fine: "#333333", utility: "BAD636" };
        let plotwidth = width - margins.l - margins.r

        let svg = select(this.container).selectAll('svg').data([0]).join('svg')
            .attr('width', width).attr('height', height)
            .attr('transform', `translate(${margins.l}, ${margins.t})`)

        /* --- MAIN ICON CONTAINER --- */
        let carbonheader = svg.selectAll('.carbonheader')
            .data([0]).join('g')
            .attr('class', 'carbonheader')
            .attr('transform', `translate(0, ${textoffsety})`)

        // let toptext = carbonheader.selectAll('.toptext')
        //     .data(['Your Building\'s', 'Carbon Footprint:']).join('text')
        //     .attr('class', 'toptext head-text-2')
        //     .text((d) => {return d})
        //     .attr('y', (d, i) => (i * 16))




        let iconcontainer = carbonheader.selectAll('.iconcontainer')
            .data([0]).join('g')
            .attr('class', 'iconcontainer')


        let iconrect = iconcontainer.selectAll('rect')
            .data([total_carbon, norm_carbon]).join('rect')
            .attr('y', (d, i) => (i) * 75)
            .attr('width', 40)
            .attr('height', 50)
            .attr('rx', '8px')
            .attr('ry', '8px')
            .attr('fill', '#BAD636')
            .style('border-color', '#D2D2D2')
            .style('border-width', '1px')
            .style('border-style', 'solid')

        let icontext = iconcontainer.selectAll('text')
            .data([total_carbon, norm_carbon]).join('text')
            .attr('class', 'head-text-2')
            .attr('y', (d, i) => (i) * 75 + 25)
            .attr('x', 20)
            .text((d, i) => {
                if (i == 0) {
                    return formatInt(total_carbon) + ' tCO2/yr'
                }
                if (i == 1) {
                    return formatInt(norm_carbon) + ' tCO2/sf/yr'
                }
            })
            .style('fill', 'white')
            .style('font-family', 'CircularStd-Bold')
            .style('font-size', '18px')
        iconrect
            .attr('width', () => icontext.node().getBBox().width + 40)

        // let bottomtext = carbonheader.selectAll('.bottomtext')
        //     .data([0]).join('text')
        //     .attr('class', 'bottomtext head-text-2')
        //     .text('tCO2/year')
        //     .attr('y', 100)

    }
    render() {
        return (
            <div className='carbon-summary-card' ref={container => this.container = container}></div>
        )

    }
}



export { CarbonSummary }