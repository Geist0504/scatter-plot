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
   	console.log(d3.min(data, (d) => d.Year))
   	//const xScale = d3.scaleLinear().domain()

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
   }
   render(){
   	return(
   		<svg ref={node => this.node = node}
   		width={900} height={600}></svg>
   	)
   }
}

export default ScatterPlot