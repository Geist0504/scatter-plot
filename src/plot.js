import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";


class ScatterPlot extends Component {
   constructor(props){
      super(props)
      this.createPlot = this.createPlot.bind(this)
   }
   componentDidMount(){
   		this.createPlot()
   }
   componentDidUpdate(){
   		this.createPlot()
   }
   createPlot(){
   	const width = this.props.size[0]
   	const height= this.props.size[1]
   	const node = this.node
   	const data = this.props.data
   	const xMin = d3.min(data, (d) => d.Year)
   	const xMax = d3.max(data, (d) => d.Year)
   	console.log(xMin, xMax)
   	const xScale = d3.scaleLinear().domain([xMin, xMax+1])
                     .range([0, width]);
   	//const xScale = d3.scaleLinear().domain()
   	const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));


   	d3.select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')
   
   d3.select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

   d3.select(node).append("g").attr("transform", "translate(0, "+ height + ")")
    .attr("id", "x-axis").call(xAxis);
   }
   render(){
   	return(
   		<svg ref={node => this.node = node}
   		width={900} height={600}></svg>
   	)
   }
}

export default ScatterPlot