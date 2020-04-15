import React from 'react';
import {
    stack,
    max,
    scaleOrdinal,
    scaleLinear,
    axisLeft,
    axisBottom,
    select,
    scaleBand,
    selectAll,
    sum
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
            barwidth: 50,
            barmarginleft: 25,
            threshtextx: 20,
            threshtexty: -30,
            finetexty: -10,
            finetextx: 150,
            finelinex: 20,
            duration: 500,
            width: 220,
            height: 350,
            barlabelpad: 10,
            margins: {
                t: 80,
                b: 10,
                r: 10,
                l: 10
            }
        }
        config = Object.assign(config, this.props.config)

        let colors = { fine: "#333333", utility: "BAD636" };

        let plotwidth = config.width - config.margins.l - config.margins.r
        let plotheight = config.height - config.margins.t - config.margins.b

        let svg = select(this.container).selectAll('svg').data([0]).join('svg')
            .attr('width', config.width).attr('height', config.height)

        let g = svg.selectAll('g').data([0]).join('g')
            .attr('class', 'bar-g')
            .attr('width', config.width)
            .attr('height', config.height)
            .attr('transform', `translate(${config.margins.l}, ${config.margins.t})`)

        let yScale = scaleLinear()
            .domain([0, max([co2limit_2024, total_carbon])])
            .range([plotheight, 0])

        // guidance / debugging only
        // let yaxis = g.selectAll('.y-axis').data([0]).join("g")
        // yaxis
        //     .attr('class', 'y-axis')
        //     .attr('transform', 'translate(20,0)')
        //     .call(axisLeft(yScale));

        let linedata = [
            {
                thresh: co2limit_2024,
                fine: fine_2024,
                key: '2024'
            },
            {
                thresh: co2limit_2030,
                fine: fine_2030,
                key: '2030'
            },
            {
                thresh: co2limit_2035,
                fine: fine_2035,
                key: '2035'
            },
        ]

        let finelines = g.selectAll('line').data(linedata, (d) => d.key).join('line')
        finelines
            .transition().duration(config.duration)
            .attr('x1', (d) => { return config.finelinex })
            .attr('y1', (d) => { return yScale(d.thresh) })
            .attr('x2', (d) => { return config.width - config.finelinex })
            .attr('y2', (d) => { return yScale(d.thresh) })
            .style('stroke', colors['utility'])
            .attr("stroke-width", () => '4px')


        let finetext = g.selectAll('.finetext').data(linedata, (d) => d.key).join('text')
            .transition().duration(config.duration)
            .text((d) => d.key + "Fine: " + formatInt(d.fine) + " $")
            .attr('x', (d) => { return config.finetextx })
            .attr('y', (d) => { return yScale(d.thresh) + config.finetexty })
            .attr('class', 'finetext')
            .attr('text-anchor', 'left')


        let threshtext = g.selectAll('.threshtext').data(linedata, (d) => d.key).join('text')
        threshtext
            .transition().duration(config.duration)
            .text((d) => d.key + "Threshold: " + formatInt(d.thresh) + " tCO2")
            .attr('x', (d) => { return config.threshtextx })
            .attr('y', (d) => { return yScale(d.thresh) + config.threshtexty })
            .attr('class', 'threshtext')
            .attr('text-anchor', 'right')



        let bar = g.selectAll('rect').data([total_carbon]).join('rect')
            .transition().duration(config.duration)
            .attr("x", () => (config.width / 2) - config.barmarginleft)
            .attr("width", config.barwidth)
            .attr('fill', (d) => colors.fine)
            .attr("y", (d) => { return yScale(total_carbon); })
            .attr("height", (d) => { return plotheight - yScale(total_carbon); })

        let axisline = g.selectAll('.axisline').data([0]).join('line')
            .attr('x1', (d) => { return config.finelinex })
            .attr('y1', (d) => { return yScale(0) })
            .attr('x2', (d) => { return config.width - config.finelinex })
            .attr('y2', (d) => { return yScale(0) })
            .style('stroke', colors['fine'])
            .attr("stroke-width", () => '4px')

        let barlabel = g.selectAll('.barlabel').data([total_carbon]).join('text').attr('class', 'barlabel')
        barlabel
            .transition().duration(config.duration)
            .text((d) => { return formatInt(d) })
            .attr('x', (d) => { return config.margins.l + (plotwidth / 2) })
            .attr('y', (d) => { return yScale(d) - config.barlabelpad })
            .attr('text-anchor', 'middle')



    }
    render() {
        return <div className='carbon-bar-container' ref={container => this.container = container}></div>
    }
}



export { CarbonBar }