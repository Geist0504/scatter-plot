import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";


class ScatterPlot extends Component {
   constructor(props){
      super(props)
      this.createPlot = this.createPlot.bind(this)
      this.formatMinutes = this.formatMinutes.bind(this)
   }
   componentDidMount(){
   		this.createPlot()
   }
   componentDidUpdate(){
   		this.createPlot()
   }
   formatMinutes = function(d) { 
	    var hours = Math.floor(d / 3600),
	        minutes = Math.floor((d - (hours * 3600)) / 60),
	        seconds = d - (minutes * 60);
	    var output = seconds + 's';
	    if (minutes) {
	        output = minutes + 'm ' + output;
	    }
	    if (hours) {
	        output = hours + 'h ' + output;
	    }
	    return output;
	};

   createPlot(){
   	const width = this.props.size[0]
   	var margin = {
	    top: 100,
	    right: 20,
	    bottom: 30,
	    left: 60
	  }
   	const height= this.props.size[1]
   	const node = this.node
   	const data = this.props.data
   	const leftPadding = 50
   	const topPadding = 50
   	console.log(data)
   	let yMin = 0
   	let yMax = 0
   	let yValArr = [0]
   	let secondArr =[]
   	if(data[0]){
   		let timeArr = data.map((d) => d.Time.split(':'))
   		secondArr = timeArr.map((time) => (60*time[0]) + +time[1])
   		console.log(secondArr)
   		//probably should parse the time into seconds first
   		yMin = d3.min(secondArr)
   		yMax = d3.max(secondArr)
   		console.log(yMin, yMax)
   	}
   	const xMin = d3.min(data, (d) => d.Year)
   	const xMax = d3.max(data, (d) => d.Year)
   	const xScale = d3.scaleLinear().domain([xMin-1, xMax+1])
                     .range([leftPadding, width]);
    const yScale = d3.scaleLinear().domain([yMin, yMax])
                    .range([20, height])
   	const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
   	const yAxis = d3.axisLeft(yScale).tickFormat(this.formatMinutes)
   	.tickValues(d3.range(yMin, yMax, 15))
   	//const yAxis = d3.axisLeft(yScale).tickFormat((d) => d3.timeFormat('%M:%S')(new Date(0).setSeconds(d)))

   	d3.select(node)
      .selectAll('circle')
      .data(this.props.data)
      .enter()
      .append('circle')
   
   d3.select(node)
      .selectAll('circle')
      .data(this.props.data)
      .exit()
      .remove()

   d3.select(node).append("g").attr("transform", "translate(0, "+ height + ")")
    .attr("id", "x-axis").call(xAxis);

   d3.select(node).append("g").attr("transform", "translate("+leftPadding+")")
    .attr("id", "y-axis").call(yAxis);

   d3.select(node)
      .selectAll('circle')
      .data(data)
      .style('fill', '#228b22') //TODO: Need to make this conditional
      .attr('cx', (d,i) => Number(xScale(d.Year)))
      .attr('cy', (d, i) => yScale(secondArr[i]))
      .attr('r', 6)
      .attr('stroke', 'black')
      .attr('class', 'dot')
      .attr('data-xvalue', (d) => d.Year)
      .attr('data-yvalue', (d, i) => {
      	let t = new Date(1970, 0,1)
      	t.setSeconds(secondArr[i])
      	return t
      })

   }
   render(){
   	return(
   		<svg ref={node => this.node = node}
   		width={900} height={600}></svg>
   	)
   }
}

export default ScatterPlot