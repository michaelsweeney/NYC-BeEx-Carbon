import React from 'react';
import {
    stack,
    max,
    scaleOrdinal,
    scaleLinear,
    axisLeft,
    axisBottom,
    select,
    selectAll
} from 'd3'
// https://codesandbox.io/embed/j3x61vjz5v -- good example

class BarChart extends React.Component {
    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }
    componentDidMount() {
        this.createBarChart()
    }
    componentDidUpdate() {
        this.createBarChart()
    }
    createBarChart() {

        let {
            elec_cost,
            gas_cost,
            steam_cost,
            fuel_two_cost,
            fuel_four_cost,
            carbon_fine_2024,
            carbon_fine_2030,
            carbon_fine_2035
        } = this.props.building

        let [width, height] = this.props.size
        let node = this.node;

        let datatostack = [
            { period: '2024', elec: elec_cost, gas: gas_cost, steam: steam_cost, fuel_two: fuel_two_cost, fuel_four: fuel_four_cost, fine: carbon_fine_2024 },
            { period: '2030', elec: elec_cost, gas: gas_cost, steam: steam_cost, fuel_two: fuel_two_cost, fuel_four: fuel_four_cost, fine: carbon_fine_2030 },
            { period: '2035', elec: elec_cost, gas: gas_cost, steam: steam_cost, fuel_two: fuel_two_cost, fuel_four: fuel_four_cost, fine: carbon_fine_2035 },
        ]
        let data = stack().keys(["elec", "gas", "steam", "fuel_two", "fuel_four", "fine"])(datatostack)
    
        let ymax = 0
        data.forEach((d) => {
            d.forEach((s) => {
                ymax = max([ymax, s[0], s[1]])
            })
        })


        let x = scaleOrdinal()
            .domain(data[0].map((d) => d.data.period))
            .range([10, width - 10]);

        let y = scaleLinear()
            .domain([0, ymax])//, (d) => { return d[0] + d[1]; }); })])
            .range([height, 0]);

        let colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574", "#d25c4d", "#f2b447"];


        console.log(x.domain())
        console.log(x.range())

        console.log(y.domain())
        console.log(y.range())

        // Define and draw axes
        let yAxis = axisLeft()
            .scale(y)
            .ticks(5)
        // .tickSize(-width, 0, 0)
        // .tickFormat((d) => { return d });

        let xAxis = axisBottom()
            .scale(x)

        select(node).select('.x-axis')
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
        select(node).select('.y-axis').call(yAxis)

        
        var groups = select(node).selectAll("g.cost")
            .data(data)
            .style("fill", (d, i) => { return colors[i]; });

        let rect = groups.selectAll("rect")
            .data((d) => { return d; })
            .enter()
            .append("rect")
            .attr("x", (d, i) => { return i * 100})
            .attr("y", (d) => { return y(d[0] + d[1]); })
            .attr("height", (d) => {
                return y(d[0]);
            })
            .attr("width", 25)
        // .on("mouseover", () => { tooltip.style("display", null); })
        // .on("mouseout", () => { tooltip.style("display", "none"); })
        // .on("mousemove", (d) => {
        //     let xPosition = mouse(this)[0] - 15;
        //     let yPosition = mouse(this)[1] - 25;
        //     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        //     tooltip.select("text").text(d.y);
        // });


        // Draw legend
        // let legend = svg.selectAll(".legend")
        //     .data(colors)
        //     .enter().append("g")
        //     .attr("class", "legend")
        //     .attr("transform", function (d, i) { return "translate(30," + i * 19 + ")"; });

        // legend.append("rect")
        //     .attr("x", width - 18)
        //     .attr("width", 18)
        //     .attr("height", 18)
        //     .style("fill", function (d, i) { return colors.slice().reverse()[i]; });

        // legend.append("text")
        //     .attr("x", width + 5)
        //     .attr("y", 9)
        //     .attr("dy", ".35em")
        //     .style("text-anchor", "start")
        //     .text(function (d, i) {
        //         switch (i) {
        //             case 0: return "Anjou pears";
        //             case 1: return "Naval oranges";
        //             case 2: return "McIntosh apples";
        //             case 3: return "Red Delicious apples";
        //         }
        //     });


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
        return <svg
            ref={node => this.node = node}
            width={this.props.size[0]}
            height={this.props.size[1]}
            building={this.props.building}>
            <g className='x-axis'></g>
            <g className='y-axis'></g>
            <g className='cost elec'></g>
            <g className='cost gas'></g>
            <g className='cost steam'></g>
            <g className='cost fuel_two'></g>
            <g className='cost fuel_four'></g>
            <g className='cost fine'></g>



        </svg>
    }
}



export { BarChart }