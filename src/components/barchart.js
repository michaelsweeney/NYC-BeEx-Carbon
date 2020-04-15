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


class BarChart extends React.Component {
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
            total_cost,
            fine_2024,
            fine_2030,
            fine_2035
        } = this.props.barprops

        let datatostack = [
            { period: '2024', utility: total_cost, fine: fine_2024, util_and_fine: fine_2024 + total_cost },
            { period: '2030', utility: total_cost, fine: fine_2030, util_and_fine: fine_2030 + total_cost },
            { period: '2035', utility: total_cost, fine: fine_2035, util_and_fine: fine_2035 + total_cost },
        ]

        let colors = { fine: "#333333", utility: "BAD636" };
        let keys = ['utility', 'fine']

        let data = stack().keys(keys)(datatostack)
        let xmax = 0
        data.forEach((d) => {
            d.forEach((s) => {
                xmax = max([xmax, s[0], s[1]])
            })
        })
        // d3 logic
        let duration = 500
        let width = 600;
        let height = 225;
        let margins = {
            t: 30,
            b: 30,
            r: 200,
            l: 20
        }

        let plotwidth = width - margins.l - margins.r
        let plotheight = height - margins.t - margins.b

        let svg = select(this.container).selectAll('svg').data([0]).join('svg')
            .attr('width', width).attr('height', height)

        svg.selectAll('.x-axis').data([0]).join('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(${margins.l}, ${plotheight + margins.t})`)

        svg.selectAll('.y-axis').data([0]).join('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${margins.l}, ${margins.t})`)

        let yScale = scaleBand()
            .domain(['2024', '2030', '2035'])
            .rangeRound([0, plotheight])

        let xScale = scaleLinear()
            .domain([xmax, 0])
            .range([plotwidth, 0])

        let xAxis = axisBottom()
            .scale(xScale)
            .ticks(5)

        let yAxis = axisLeft()
            .scale(yScale)
            .ticks(3)
            .tickSize(0)
            .tickSizeOuter(0)

        svg.select('.y-axis')
            .call(yAxis)


        let groups = svg.selectAll(".bar")
            .data(data, d => d.key)
        // groups
            .join('g')
            .attr("class", "bar")
            .attr(`transform`, `translate(${margins.l}, ${margins.t})`)
            .style("fill", function (d, i) { return colors[d.key]; });

        let rects = groups.selectAll("rect").data((d) => { return d })
            .join('rect')
            .attr("y", (d, i) => { return yScale(d.data.period) + 15 })
            .transition().duration(duration)
            .attr("x", (d) => { return xScale(d[0]); })
            .attr("width", (d) => { return xScale(d[1]) - xScale(d[0]); })
            .attr("height", 25)


        let labels = svg.selectAll(".label")
            .data(datatostack, (d) => d.period)
            .join("text")
            .attr(`transform`, `translate(${margins.l}, ${margins.t})`)
            .attr("class", "label")
            .attr("text-anchor", "start")
            .transition().duration(duration)
            .attr("x", (d) => {
                return xScale(d.util_and_fine) + 5
            })
            .attr("y", (d) => {
                return yScale(d.period) + 30
            })
            .text((d) => {
                if (d.util_and_fine == 0) {
                    return ''
                }
                return '$' + formatInt(d.util_and_fine)
            })



        // Draw legend
        let legend = svg.selectAll(".legend").data([0]).join('g').attr('class', 'legend')
            .join('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${plotwidth + margins.l + 40}, ${margins.t + 40})`)

        legend.selectAll('rect').data(Object.keys(colors)).join('rect')
            .attr("x", 15)
            .attr("y", (d, i) => { return i * 30 })
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", (d, i) => { return colors[d]; });

        legend.selectAll('text').data(Object.keys(colors)).join('text')
            .attr("x", 50)
            .attr("y", (d, i) => { return (i * 30) + 15 })
            .attr('font-size', 14)
            .attr('class', 'legend-text')
            .style("text-anchor", "start")
            .text((d, i) => {
                switch (d) {
                    case 'utility': return "Utility Cost ($)";
                    case 'fine': return "Carbon Fine ($)";
                }
            });




        // // Prep the tooltip bits, initial display is hidden
        // var tooltip = svg.append("g")
        //     .attr("class", "tooltip")
        //     .style("display", "none");

        // tooltip.append("rect")
        //     .attr("width", 30)
        //     .attr("height", 20)
        //     .attr("fill", "white")
        //     .style("opacity", 0.5);

        // tooltip.append("text")
        //     .attr("x", 15)
        //     .attr("dy", "1.2em")
        //     .style("text-anchor", "middle")
        //     .attr("font-size", "12px")
        //     .attr("font-weight", "bold");






    }
    render() {
        return <div className = 'bar-container' ref={container => this.container = container}></div>
    }
}



export { BarChart }