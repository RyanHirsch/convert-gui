import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import ProgressBar from '../components/ProgressBar';
import DevTools from '../containers/DevTools';

class App extends Component {
  constructor() {
    super();
    this.state = {
      percentComplete: 0,
    };
  }
  componentDidMount() {
    ipcRenderer.on('progress', (event, arg) => {
      const { percent } = arg;
      this.setState({ percentComplete: percent });
    });
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <ProgressBar percent={ this.state.percentComplete } />
        <DevTools />
      </div>
    );
  }
}

export default App;
