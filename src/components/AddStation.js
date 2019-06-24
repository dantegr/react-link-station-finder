import React from 'react';

export default class AddStation extends React.Component {
  state ={
    error: undefined
  };

  handleAddStation = (e) => {
    e.preventDefault();
    console.log('testing');
    const valueX = e.target.elements.stationX.value.trim();
    const valueY = e.target.elements.stationY.value.trim();
    const valueZ = e.target.elements.stationZ.value.trim();

    const value = [valueX,valueY,valueZ];
    const error = this.props.handleAddStation(value);
    
    this.setState(() => ({ error: error}));

    if (!error) {
      e.target.elements.stationX.value = '';
      e.target.elements.stationY.value = '';
      e.target.elements.stationZ.value = '';
    }
  
  }
  render() {
    return (
      <div>
        {this.state.error && <p className="add-station-error">{this.state.error}</p>}
        <form className="add-station" onSubmit={this.handleAddStation}>
          <input className="add-station__input" type="text" name="stationX" placeholder="X coordinate"/>
          <input className="add-station__input" type="text" name="stationY" placeholder="Y coordinate"/>
          <input className="add-station__input" type="text" name="stationZ" placeholder="Reach"/>
          <button className="button">Add Station</button>
        </form>
      </div>
    );
  }
}