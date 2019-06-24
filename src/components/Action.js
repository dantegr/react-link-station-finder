import React from 'react';

const Action = (props) => {
  
  return (
    <div>
      <button
      className="big-button"
      onClick={props.handlePick}
      disabled={!props.isActivated}
      >
      Find the best stations for your points</button>
    </div>

  );

};

export default Action;