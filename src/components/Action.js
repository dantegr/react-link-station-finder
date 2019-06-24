import React from 'react';

const Action = (props) => {
  
  return (
    <div>
      <button
      className="big-button"
      onClick={props.handlePick}
      disabled={!props.isActivated}
      >
      Click to find the best stations for your points</button>
    </div>

  );

};

export default Action;