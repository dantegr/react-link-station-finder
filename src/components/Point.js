//This component handles the display of a single point that the user provided. There is also a call to the handleDeletePoint function in order to remove from the state.

import React from 'react';

const Point = (props) => {
  return (
    <div className="point">
      <p className="point__text">{props.count}. [{props.pointText[0]},{props.pointText[1]}]</p>
      <button 
      className="button button--link"
      onClick={(e) => {
        props.handleDeletePoint(props.pointText);
      }}
      >Remove</button>
    </div>
  );
};

export default Point;
