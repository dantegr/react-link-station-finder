//This component handles the display of the Stations Block  with all the stations the user provided. It includes the Stations componet and it also utilizes the handleDeleteStations function that removes all the station inputs from the state.

import React from 'react';
import Station from './Station';

const Stations = (props) => {
  return (
    <div>
      <div className="widget-header">
        <h3 className="widget-header__title">Stations</h3>
      
        <button
        className="button button--link"
        onClick={props.handleDeleteStations}>Remove All</button>
      </div>
    {props.stations.length === 0 && <p className="widget-message">Please add station coordinates and reach</p>}
      
      {
        props.stations.map((station,index) => (
          <Station
          key={Station} 
          stationText={station}
          count={index + 1}
          handleDeleteStation={props.handleDeleteStation} 
          />
        ))
      }
            
    </div>
  );
};

export default Stations;
