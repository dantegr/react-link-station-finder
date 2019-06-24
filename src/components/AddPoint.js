import React from 'react';

export default class AddPoint extends React.Component {
  state ={
    error: undefined
  };

  handleAddPoint = (e) => {
    e.preventDefault();
    console.log('testing');
    const valueX = e.target.elements.pointX.value.trim();
    const valueY = e.target.elements.pointY.value.trim();
    const value = [valueX,valueY];
    const error = this.props.handleAddPoint(value);
    
    this.setState(() => ({ error: error}));

    if (!error) {
      e.target.elements.pointX.value = '';
      e.target.elements.pointY.value = '';
    }
  
  }
  render() {
    return (
      <div>
        {this.state.error && <p className="add-point-error">{this.state.error}</p>}
        <form className="add-point" onSubmit={this.handleAddPoint}>
          <input className="add-point__input" type="text" name="pointX" placeholder="X coordinate"/>
          <input className="add-point__input" type="text" name="pointY" placeholder="Y coordinate"/>
          <button className="button">Add Point</button>
        </form>
      </div>
    );
  }
}