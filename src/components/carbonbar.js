import React from 'react';
import {
    max,
    scaleLinear,
    select,
} from 'd3'
import { formatInt } from './numformat.js'

class CarbonBar extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.createBarChart()
    }
    componentDidUpdate() {
        this.createBarChart()
    }
    createBarChart = () => {
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

        let config = {
            barthickness: 20,
            barmarginleft: 25,
            threshtextx: 20,
            threshtexty: -30,
            finetexty: -10,
            finetextx: 150,
            finelinex: 10,
            duration: 500,
            width: 700,
            height: 200,
            barlabelpad: 10,
            margins: {
                t: 50,
                b: 10,
                r: 200,
                l: 10
            }
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

        config = Object.assign(config, this.props.config)

        let colors = { fine: "#333333", utility: "BAD636" };
        let divdims = this.container.parentElement.getBoundingClientRect()
        let plotwidth = config.width - config.margins.l - config.margins.r
        let plotheight = config.height - config.margins.t - config.margins.b
        let xScale = scaleLinear()
            .domain([0, max([co2limit_2024, total_carbon])])
            .range([0, plotwidth])

        let svg = select(this.container).selectAll('svg').data([0]).join('svg')
            .attr('width', config.width).attr('height', config.height)

        let barg = svg.selectAll('g').data([0]).join('g')
            .attr('class', 'bar-g')
            .attr('width', config.width)
            .attr('height', config.height)
            .attr('transform', `translate(${100}, ${125})`)




















        /* --- MAIN ICON CONTAINER --- */
        let carbonheader = svg.selectAll('.carbonheader')
            .data([0]).join('g')
            .attr('class', 'carbonheader')
            .attr('transform', `translate(0, 20)`)


        let toptext = carbonheader.selectAll('.toptext')
            .data([0]).join('text')
            .attr('class', 'toptext')
            .text('Your Building\'s Footprint')
            .attr('y', 0)

        let iconcontainer = carbonheader.selectAll('.iconcontainer')
            .data([0]).join('g')
            .attr('class', 'iconcontainer')


        let iconrect = iconcontainer.selectAll('rect')
            .data([0]).join('rect')
            .attr('y', 18)
            .attr('width', 40)
            .attr('height', 50)
            .attr('rx', '8px')
            .attr('ry', '8px')
            .attr('fill', '#BAD636')

        let icontext = iconcontainer.selectAll('text')
            .data([0]).join('text')
            .attr('y', 45)
            .attr('x', 20)
            .text(formatInt(total_carbon))
            .style('fill', 'white')
            .style('font-family', 'CircularStd-Bold')
            .style('font-size', '18px')

        iconrect
            // .transition().duration(500)
            .attr('width', () => icontext.node().getBBox().width + 40)

        let bottomtext = carbonheader.selectAll('.bottomtext')
            .data([0]).join('text')
            .attr('class', 'bottomtext')
            .text('tCO2/year')
            .attr('y', 100)



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
            let g = select(this).selectAll('group').data([0]).join('g').attr('transform', `translate(${i * 150},0)`)

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
                // console.log(node.getBBox().width)
                textwidths.push(node.getBBox().width)
            })
            let maxwidth = max(textwidths)
            g.select('.rect-container')
                .attr('width', () => maxwidth + 30)
        }




        // construct bar
        // let finelines = barg.selectAll('line').data(linedata, (d) => d.key).join('line')
        // finelines
        //     .transition().duration(config.duration)
        //     .attr('y1', (d) => { return config.finelinex })
        //     .attr('x1', (d) => { return xScale(d.thresh) })
        //     .attr('y2', (d) => { return config.width - config.finelinex })
        //     .attr('x2', (d) => { return xScale(d.thresh) })
        //     .style('stroke', 'black')//colors['utility'])
        //     .attr("stroke-width", () => '2px')



        //
        //  <polyline fill="none" stroke="blue" stroke-width="2"
        //    points="05,30
        //            15,30
        //            15,20
        //            25,20
        //            25,10
        //            35,10"





        let bar = barg.selectAll('rect').data([total_carbon]).join('rect')
            .transition().duration(config.duration)
            .attr("y", 40)
            .attr("height", config.barthickness)
            .attr('fill', '#999999')
            .attr("x", 0)
            .attr("width", (d) => { return xScale(total_carbon) })




        let axisline = barg.selectAll('.axisline').data([0]).join('line')
            .attr('y1', (d) => { return 30 })
            .attr('x1', (d) => { return 0 })//xScale(0) })
            .attr('y2', (d) => { return 70 })
            .attr('x2', (d) => { return 0 })//xScale(0) })
            .style('stroke', colors['fine'])
            .attr("stroke-width", () => '2px')


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
            .transition().duration(500)
            .attr('points', (d, i) => {
                console.log(d)
                if (d.fine == 0) {
                    return ''
                }
                return `
                        ${xScale(d.thresh)}, 80
                        ${xScale(d.thresh)}, ${40 - 15 * imap[i]}
                        ${(i + 1) * 150}, ${40 - 15 * imap[i]}
                        ${(i + 1) * 150}, -50
                        `
            }
            )

    }
    render() {
        return <div className='carbon-bar-container' ref={container => this.container = container}></div>
    }
}



export { CarbonBar }