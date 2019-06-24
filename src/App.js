import React from 'react';
import Header from './components/Header';
import './App.css';

export default class App extends React.Component {

  render() {
    const subtitle = 'Calculate the Best Station for each point';
    
  return (
    <div>
    <Header  subtitle={subtitle}/>
    
    </div>

  );

  }
}
