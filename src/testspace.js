import React from 'react';

import './App.css';
import './css/sidebar.css';
import './css/mainlayout.css';

import './css/chart.css';


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







class TestSpace extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.createBarChart()
  }
  componentDidUpdate() {
    this.createBarChart()
  }

  createBarChart() {

    let data = this.props.data


    // definitions and setup
    let myDuration = 600;
    let firstTime = true;

    let width = 200,
      height = 200,
      radius = Math.min(width, height) / 2;


    let color = scaleOrdinal([
      "#358FB4",
      "#6EB12C",
      "#B23232",
      "#A644E2",
      "#62009E"
    ]);

    let piefunc = pie()
      .value(function (d) { return d.val; })
      .sort(null);

    let arcfunc = arc()
      .innerRadius((radius - 20) * 0.5)
      .outerRadius(radius - 20);


    //  build container
    let svg = select(this.container).selectAll('svg')

    svg.data([0]).enter().append('svg').merge(svg)
      .attr("width", width)
      .attr("height", height)
      .exit().remove()

    let g = select(this.container).selectAll('svg').selectAll('g')

    g.data([0]).enter().append('g').merge(g)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    let path = g.selectAll("path");

    // format data -- can easily refactor this because nesting is not particularly valuable.
    let nesteddata = nest()
      .key(function (d) { return d; })
      .entries(data)
      .reverse();
    console.log(nesteddata)
    let data0 = path.data()
    let data1 = piefunc(nesteddata[0].values);


    // handle paths and tweening
    path = path.data(data1, key);
    path
      .transition()
      .duration(myDuration)
      .attrTween("d", arcTween)

    path
      .enter()
      .append("path")
      .each(function (d, i) {
        let narc = findNeighborArc(i, data0, data1, key);
        if (narc) {
          this._current = narc;
          this._previous = narc;
        } else {
          this._current = d;
        }
      })
      .attr("fill", function (d, i) {
        return color(d.data.utility)
      })
      .transition()
      .duration(myDuration)
      .attrTween("d", arcTween)


    path
      .exit()
      .transition()
      .duration(myDuration)
      .attrTween("d", function (d, index) {
        let currentIndex = this._previous.data.utility;
        let i = interpolateObject(d, this._previous);
        return function (t) {
          return arcfunc(i(t))
        }
      })
      .remove()
    firstTime = false;


    function key(d) {
      return d.data.utility;
    }


    function findNeighborArc(i, data0, data1, key) {
      let d;

      if (d = findPreceding(i, data0, data1, key)) {
        let obj = Object.assign({}, d)
        obj.startAngle = d.endAngle;
        return obj;

      } else if (d = findFollowing(i, data0, data1, key)) {
        let obj = Object.assign({}, d)
        obj.endAngle = d.startAngle;
        return obj;
      }

      return null

    }

    // Find the element in data0 that joins the highest preceding element in data1.
    function findPreceding(i, data0, data1, key) {
      let m = data0.length;
      while (--i >= 0) {
        let k = key(data1[i]);
        for (let j = 0; j < m; ++j) {
          if (key(data0[j]) === k) return data0[j];
        }
      }
    }

    // Find the element in data0 that joins the lowest following element in data1.
    function findFollowing(i, data0, data1, key) {
      let n = data1.length, m = data0.length;
      while (++i < n) {
        let k = key(data1[i]);
        for (let j = 0; j < m; ++j) {
          if (key(data0[j]) === k) return data0[j];
        }
      }
    }

    function arcTween(d) {
      let i = interpolate(this._current, d);
      this._current = i(0);
      return function (t) {
        return arcfunc(i(t))
      }

    }


  }








  render() {
    return (
      <div ref={container => this.container = container}></div>
    )
  }
}










export { TestSpace }
