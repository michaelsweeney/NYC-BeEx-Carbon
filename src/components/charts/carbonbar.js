import React from 'react';
import {
    max,
    scaleLinear,
    select,
} from 'd3'
import { formatInt } from '../numformat.js'

class CarbonBar extends React.Component {
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
            this.createBarChart({ ignoretransition: true })
        })
    }
    createBarChart = (params) => {
        // parse data
        let {
            total_carbon,
            co2limit_2024,
            co2limit_2030,
            co2limit_2035,
            fine_2024,
            fine_2030,
            fine_2035,
        } = this.props.carbondata

        let divheightoffset = 50;
        let divwidthoffset = 28;
        let divdims = this.container.getBoundingClientRect()

        let duration = 500
        if (params.ignoretransition) {
            duration = 0;
        }

        console.log(duration)

        let width = divdims.width - divwidthoffset;
        let height = divdims.height - divheightoffset;

        let barthickness = height / 15

        let margins = {
            t: 10,
            b: 10,
            r: 10,
            l: 10
        }


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
        let plotheight = height - margins.t - margins.b
        let xScale = scaleLinear()
            .domain([0, max([co2limit_2024, total_carbon])])
            .range([0, plotwidth])

        let svg = select(this.container).selectAll('svg').data([0]).join('svg')
            .attr('width', width).attr('height', height)

        let barg = svg.selectAll('g').data([0]).join('g')
            .attr('class', 'bar-g')
            .attr('width', plotwidth - margins.r)
            .attr('height', plotheight - margins.b)
            .attr('transform', `translate(${margins.l}, ${margins.t})`)

        // create threshold containers
        let threshcontainermain = svg.selectAll('.thresh-main-container')
            .data([0]).join('g')
            .attr('class', 'thresh-container')
            .attr('transform', `translate(200, 20)`)

        let subcontainers = threshcontainermain.selectAll('.sub-container')
            .data(linedata).join('g')
            .attr('class', 'sub-container')

        subcontainers
            .each(fineContainer)


        function fineContainer(d, i) {
            let g = select(this).selectAll('group').data([0]).join('g').attr('transform', `translate(${i * 175},0)`)

            g.selectAll('.rect-container').data([0]).join('rect')
                .attr('class', 'rect-container')
                .attr('width', 100)
                .attr('height', 70)
                .attr('rx', 8)
                .attr('fill', '#595954')

            g.selectAll('.year-text').data([0]).join('text')
                .attr('class', 'carbon-summary-text top-text')
                .attr('x', 10)
                .attr('y', 20)
                .text(d.key)

            g.selectAll('.fine-text').data([0]).join('text')
                .attr('class', 'carbon-summary-text fine-text')
                .attr('x', 10)
                .attr('y', 35)
                .text(`Threshold: ${formatInt(d.thresh)}`)

            g.selectAll('.thresh-text').data([0]).join('text')
                .attr('class', 'carbon-summary-text thresh-text')
                .attr('x', 10)
                .attr('y', 50)
                .text(`Fine: ${formatInt(d.fine)}`)

            let textwidths = []
            g.selectAll('text').nodes().forEach((node) => {
                textwidths.push(node.getBBox().width)
            })
            let maxwidth = max(textwidths)
            g.select('.rect-container')
                .attr('width', () => maxwidth + 30)
        }

        let bar = barg.selectAll('rect').data([total_carbon]).join('rect')
            .transition().duration(duration)
            .attr("y", 40)
            .attr("height", barthickness)
            .attr('fill', '#C4C4C4')
            .attr("x", 0)
            .attr("width", (d) => { return xScale(total_carbon) })


        let axisline = barg.selectAll('.axisline').data([0]).join('line')
            .attr('y1', (d) => { return 30 })
            .attr('x1', (d) => { return 0 })
            .attr('y2', (d) => { return 70 })
            .attr('x2', (d) => { return 0 })
            .style('stroke', colors['fine'])
            .attr("stroke-width", () => '1px')

        let bartext = barg.selectAll('.bartext').data([0]).join('text')
        bartext
            .text((d) => { return formatInt(total_carbon) })
            .attr('class', 'bartext')
            .transition().duration(duration)
            .attr('x', (d) => xScale(total_carbon) + 2)
            .attr('y', 40 + (barthickness / 1.5))

        // polylines linked to rects
        let imap = {
            0: 3,
            1: 2,
            2: 1
        }
        let polylines = barg.selectAll('polyline').data(linedata, (d) => d.key).join('polyline')
        polylines
            .attr('stroke', 'black')
            .attr('stroke-width', '1px')
            .attr('fill', 'none')
            .transition().duration(duration)
            .attr('points', (d, i) => {
                if (d.thresh > (total_carbon * 2)) {
                    return ''
                }
                if ((d.thresh == 0) && total_carbon == 0) {
                    return ''
                }
                return `
                        ${xScale(d.thresh)}, 80
                        ${xScale(d.thresh)}, ${40 - 15 * imap[i]}
                        ${(i + 1) * 175}, ${40 - 15 * imap[i]}
                        ${(i + 1) * 175}, -50
                        `
            })

    }

    render() {
        return <div className='carbon-bar-card' ref={container => this.container = container}></div>
    }
}



export { CarbonBar }