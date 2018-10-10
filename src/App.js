import React, { Component } from 'react';
import './App.css';
import ScatterPlot from './plot'

class App extends Component {
  constructor(){
    super()
    this.state = {data: []}
  }
  async componentDidMount(){
    const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json');
    const json = await response.json()
    this.setState({data: json})
   }
  render() {
    return (
      <div className="App">
       <div className='container'>
          <div id='title'>Doping in Professional Bicycle Racing</div>
          <div className='visHolder'>
            <ScatterPlot data={this.state.data} size={[800,500]}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
