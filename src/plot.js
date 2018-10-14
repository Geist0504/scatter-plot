import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";


// Lessons:
// 	1. If working with Dates or times, use Date objects
// 	2. Plan data structures in advance
// 	3. If cleaning up object and you won't need the original, just convert the values vs creating multiple objects
//	4. Declare svg is a variable returned from the selection of a node vs selecting that node very time if you nest a g in it as then you will be appending everything to the g.

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
   	var margin = {
	    top: 100,
	    right: 20,
	    bottom: 30,
	    left: 60
	  }
	const height =  630 - margin.top - margin.bottom;
   	const width= 920 - margin.left - margin.right
   	const node = this.node
   	const data = this.props.data
   	const leftPadding = 50
   	const timeFormat = d3.timeFormat("%M:%S");
   	console.log(height)
   	const yScale =d3.scaleTime().range([0, height]);
   	if(data[0]){
   		data.map((d) => {
   			let parsedTime = d.Time.split(':')
   			d.Time = new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]))
   		})
   		let svg = d3.select(node).attr("width", width + margin.left + margin.right)
		  .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   		yScale.domain(d3.extent(data,(d) => d.Time))
   		const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat)
   		svg.append("g").attr("transform", "translate("+leftPadding+")")
    .attr("id", "y-axis").call(yAxis).attr("y", 6);
    	const xMin = d3.min(data, (d) => d.Year)
   		const xMax = d3.max(data, (d) => d.Year)
   		const xScale = d3.scaleLinear().domain([xMin-1, xMax+1])
                     .range([leftPadding, width]);
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        svg.append("g").attr("transform", "translate(0, "+ height + ")")
    .attr("id", "x-axis").call(xAxis);

    let modal = d3.select("body").append("div")
		.attr("class", "tooltip")
		.attr("id", "tooltip")
		.style("opacity",0)

    svg.selectAll('circle')
      .data(this.props.data)
      .enter()
      .append('circle')
   
   svg.selectAll('circle')
      .data(this.props.data)
      .exit()
      .remove()

   svg.selectAll('circle')
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
      	modal.transition().duration(100).style('opacity', .9)
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

    svg.append("text")
        .attr("id","title")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "30px") 
        .text("Doping in Professional Bicycle Racing");
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