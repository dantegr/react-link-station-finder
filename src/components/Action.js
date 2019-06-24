//This Action component that triggers the solution modal. It stays deactivated if there are no points and stations at the main state.

import React from 'react';

const Action = (props) => {
  
  return (
    <div>
      <button
      className="big-button"
      onClick={props.handleSolution}
      disabled={!props.isActivated}
      >
      Click to find the best stations for your points</button>
    </div>

  );

};

export default Action;