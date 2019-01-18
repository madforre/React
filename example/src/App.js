import React, { Component } from 'react';
import './App.css';
import Madforre from './Madforre';
import MadforreFunc from './MadforreFunc';
import Counter from './Counter';
import Lifecycle from './Lifecycle';

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* 주석 */}
        <h4
        // 주석
        >react linco</h4>
        <Madforre 
        // name ="madforre"
        />
        <MadforreFunc name="func component" />
        <Counter />
        <hr></hr>
        <Lifecycle />
      </div>
    );
  }
}

export default App;