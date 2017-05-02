import React, { Component } from 'react';
import MenuBar from './MenuBar';
import DevTools from './DevTools';

class App extends Component {
  render() {
    return (
      <div>
        <MenuBar />
        <DevTools />
      </div>
    );
  }
}

export default App;
