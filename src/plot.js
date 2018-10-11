import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";


// Lessons:
// 	1. If working with Dates or times, use Date objects
// 	2. Plan data structures in advance
// 	3. If cleaning up object and you won't need the original, just convert the values vs creating multiple objects

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
   	const timeFormat = d3.timeFormat("%M:%S");
   	console.log(data)
   	const yScale =d3.scaleTime().range([0, height]);
   	if(data[0]){
   		data.map((d) => {
   			let parsedTime = d.Time.split(':')
   			d.Time = new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]))
   		})
   		yScale.domain(d3.extent(data,(d) => d.Time ))
   		const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat)
   		d3.select(node).append("g").attr("transform", "translate("+leftPadding+")")
    .attr("id", "y-axis").call(yAxis);
    	const xMin = d3.min(data, (d) => d.Year)
   		const xMax = d3.max(data, (d) => d.Year)
   		const xScale = d3.scaleLinear().domain([xMin-1, xMax+1])
                     .range([leftPadding, width]);
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        d3.select(node).append("g").attr("transform", "translate(0, "+ height + ")")
    .attr("id", "x-axis").call(xAxis);

    let modal = d3.select("body").append("div")
		.attr("class", "tooltip")
		.attr("id", "tooltip")
		.style("opacity",0)

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

   d3.select(node)
      .selectAll('circle')
      .data(data)
      .style('fill', '#228b22') //TODO: Need to make this conditional
      .attr('cx', (d) => xScale(d.Year))
      .attr('cy', (d, i) => yScale(d.Time))
      .attr('r', 6)
      .attr('stroke', 'black')
      .attr('class', 'dot')
      .attr('data-xvalue', (d) => d.Year)
      .attr('data-yvalue', (d) => d.Time.toISOString())
      .on('mouseover', function(d) {
      	modal.transition().duration(200).style('opacity', .9)
        modal.attr("data-year", d.Year)
        modal.html(d.Name + ": "+ d.Nationality + "<br>"
           	+ "Year: " + d.Year+", Time: "+d.Time
           	+ (d.Doping?"<br><br>" +d.Doping:""))
        .style("left", (d3.event.pageX) +"px")
        .style("top", (d3.event.pageY+20)+"px")
      })
      .on('mouseout', function(d){
      	modal.transition().duration(200).style('opacity', 0)
      })
   	}
   }
   render(){
   	return(
   		<svg ref={node => this.node = node}
   		width={900} height={600}></svg>
   	)
   }
}

// div.html(d.Name + ": " + d.Nationality + "<br/>"
//               + "Year: " +  d.Year + ", Time: " + timeFormat(d.Time) 
//               + (d.Doping?"<br/><br/>" + d.Doping:""))
//         .style("left", (d3.event.pageX) + "px")
//         .style("top", (d3.event.pageY - 28) + "px");
//     })

export default ScatterPlot