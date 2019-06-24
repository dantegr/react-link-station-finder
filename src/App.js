import React from 'react';
import Header from './components/Header';
import AddPoint from './components/AddPoint';
import Points from './components/Points';
import AddStation from './components/AddStation';
import Stations from './components/Stations';
import Action from './components/Action';
import './App.css';
import Swal from 'sweetalert2';

export default class App extends React.Component {
  state ={
    points: [],
    stations: [],
    results: []
  };

  // This function handles the final solution and displays it in a modal. It is utilized by the Action Component
  handleSolution = () => {

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
      return Math.round((Math.pow(Math.abs(station[2] - distance) ,2)) * 100) / 100;
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

   
    //This initializes a modal alert with the solution
    Swal.fire({
      title: 'Results',
      html:'<ul style="text-align:left;"><li>' + this.state.results.join("</li><li>") + '</li></ul>',
      type:'info',
      width: '500px'}).then(this.setState(() => ({
        points: [],
        stations: [],
        results: []
      })));
  };

  //This function deletes the stations array by setting it to an empty array. It is utilized by the Stations component.
  handleDeleteStations = () => {
    this.setState(() => ({stations: [] }));
  }

  //This function deletes a single station input from the stations array. It is utilized by the Stations component.
  handleDeleteStation = (stationToRemove) => {
    this.setState((prevState) => ({
      stations:prevState.stations.filter ((station) => {
        return stationToRemove !==station;
      })
    }));
  }

  //This functions add a station input to the stations array. It is utilized by the AddStation component.
  handleAddStation = (station) => {
    this.setState((prevState) => ({ stations: prevState.stations.concat([station])}));
  }

  //This function deletes the points array by setting it to an empty array. It is utilized by the Points component.     
  handleDeletePoints = () => {
    this.setState(() => ({points: [] }));
  }

  //This function deletes a single point input from the points array. It is utilized by the Points component.
  handleDeletePoint = (pointToRemove) => {
    this.setState((prevState) => ({
      points:prevState.points.filter ((point) => {
        return pointToRemove !==point;
      })
    }));
  }

   //This functions add a point input to the points array. It is utilized by the AddStation component.
  handleAddPoint = (point) => {
    this.setState((prevState) => ({ points: prevState.points.concat([point])}));
  }

  //Main Render
  render() {
    const subtitle = 'Calculate the Best Station for each point';

  return (
    <div>
      <Header  subtitle={subtitle}/>
      <div className="container">
        <Action 
          isActivated={this.state.stations.length > 0 && this.state.points.length > 0}
          handleSolution={this.handleSolution}
        />
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
        <div className="widget">
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
    </div>

  );

  }
}
