import React from 'react';
import Header from './components/Header';
import AddPoint from './components/AddPoint';
import Points from './components/Points';
import AddStation from './components/AddStation';
import Stations from './components/Stations';
import Action from './components/Action';
import './App.css';

export default class App extends React.Component {
  state ={
    points: [],
    stations: [],
    results: []
  };

  handlePick = () => {

    const findDistance = (pointA, pointB) => {
      return Math.sqrt(Math.pow(Math.abs(pointA[0] - pointB[0]), 2) + Math.pow(Math.abs(pointA[1] - pointB[1]), 2));
    };
    
    // This function calcutes the power between a point and a station utilizing the given power calculation formula
    // and the findDistance function we created above.
    const findPower = (point , station) => {
      const distance = findDistance(point, station);
      if (distance > station[2] ) {
        return 0;
      } else{
      return Math.pow(Math.abs(station[2] - distance) ,2);
      }
    };
    
    
    // This is the functionality loop that checks every point for each station and outputs the coordinates of the station
    // with the best power for every given point.A bestStation array variable is introduced as a placeholder for the station
    // with the best power and its elements represent z the power of station and x,y the coordinates of the station [z,x,y]
    for(let i=0; i<this.state.points.length; i++){
      let bestStation = [0,0,0];
      for(let j=0; j < this.state.stations.length; j++){
        let power = findPower(this.state.points[i],this.state.stations[j]);
        if( power > bestStation[0]){
          bestStation[0] = power ;
          bestStation[1] = this.state.stations[j][0];
          bestStation[2] = this.state.stations[j][1];   
        }
      };
    
      if (bestStation[0] === 0) {
        this.state.results.push("No link station within reach for point " + this.state.points[i][0] +"," + this.state.points[i][1]);
      } else {
        this.state.results.push("Best link station for point " + this.state.points[i][0]  + "," + this.state.points[i][1] + " is " + bestStation[1] + "," + bestStation[2] + " with power " + bestStation[0]);
      };
    }

    alert(this.state.results.join("\n"));
  };

  
  handleDeleteStations = () => {
    this.setState(() => ({stations: [] }));
  }

  handleDeleteStation = (stationToRemove) => {
    this.setState((prevState) => ({
      stations:prevState.stations.filter ((station) => {
        return stationToRemove !==station;
      })
    }));
  }

  handleAddStation = (station) => {
    if (!station) {
      return 'Enter valid value';
    }else if (this.state.stations.indexOf(station)> -1) {
      return 'This option already exists'
    }

    this.setState((prevState) => ({ stations: prevState.stations.concat([station])}));
  }

    
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

    try {
      const json = localStorage.getItem('stations');
      const stations = JSON.parse(json);
      
      if (stations){
      this.setState(() => ({stations: stations}));
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

    if (prevState.points.length !== this.state.stations.length) {
      const json = JSON.stringify(this.state.stations);
      localStorage.setItem('stations',json);
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
      <Action 
        isActivated={this.state.stations.length > 0 && this.state.points.length > 0}
        handlePick={this.handlePick}
      />
      <div className="widget-points">
        <Points 
          points={this.state.points}
          handleDeletePoints={this.handleDeletePoints}
          handleDeletePoint={this.handleDeletePoint}
        />
        <AddPoint 
          handleAddPoint={this.handleAddPoint}
        />
      </div>
      <div className="widget-stations">
      <Stations 
        stations={this.state.stations}
        handleDeleteStations={this.handleDeleteStations}
        handleDeleteStation={this.handleDeleteStation}
      />
      <AddStation
        handleAddStation={this.handleAddStation}
      />
    </div>
    </div>

  );

  }
}
