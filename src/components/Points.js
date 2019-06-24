import React from 'react';
import Point from './Point';

const Points = (props) => {
  return (
    <div>
      <div className="widget-header">
        <h3 className="widget-header__title">Points</h3>
      
        <button
        className="button button--link"
        onClick={props.handleDeletePoints}>Remove All</button>
      </div>
    {props.points.length === 0 && <p className="widget-message">Please add point coordinates</p>}
      
      {
        props.points.map((point,index) => (
          <Point
          key={point} 
          pointText={point}
          count={index + 1}
          handleDeletePoint={props.handleDeletePoint} 
          />
        ))
      }
            
    </div>
  );
};

export default Points;
