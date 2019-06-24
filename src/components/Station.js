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
