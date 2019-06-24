//This component handles the display of a single station that the user provided. There is also a call to the handleDeleteStation function in order to remove from the state.

import React from 'react';

const Station = (props) => {
  return (
    <div className="station">
      <p className="station__text">{props.count}. [{props.stationText[0]},{props.stationText[1]},{props.stationText[2]}]</p>
      <button 
      className="button button--link"
      onClick={(e) => {
        props.handleDeleteStation(props.stationText);
      }}
      >Remove</button>
    </div>
  );
};

export default Station;
