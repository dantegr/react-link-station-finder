import React from 'react';
import Header from './components/Header';
import AddPoint from './components/AddPoint';
import Points from './components/Points';
import './App.css';

export default class App extends React.Component {
  state ={
    points: [],
    selectedPoint: undefined
  };

  
  handleDeletePoints = () => {
    this.setState(() => ({points: [] }));
  }

  handleDeletePoint = (pointToRemove) => {
    this.setState((prevState) => ({
      points:prevState.points.filter ((point) => {
        return pointToRemove !==point;
      })
    }));
  }

  handleAddPoint = (point) => {
    if (!point) {
      return 'Enter valid value';
    }else if (this.state.points.indexOf(point)> -1) {
      return 'This option already exists'
    }

    this.setState((prevState) => ({ points: prevState.points.concat([point])}));
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('points');
      const points = JSON.parse(json);
      
      if (points){
      this.setState(() => ({points: points}));
      }
    }catch (e) {
      //do nothing
    }
  
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.points.length !== this.state.points.length) {
      const json = JSON.stringify(this.state.points);
      localStorage.setItem('points',json);
      console.log ('saving data');
    }
  }
  componentWillUnmount() {
    console.log('component Will unmount!');
  }


  render() {
    const subtitle = 'Calculate the Best Station for each point';

  return (
    <div>
      <Header  subtitle={subtitle}/>
      <div className="widget">
        <Points 
          points={this.state.points}
          handleDeletePoints={this.handleDeletePoints}
          handleDeletePoint={this.handleDeletePoint}
        />
        <AddPoint 
          handleAddPoint={this.handleAddPoint}
        />
      </div>
    </div>

  );

  }
}
