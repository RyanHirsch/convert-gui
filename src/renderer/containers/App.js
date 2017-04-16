import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar';
import { ipcRenderer } from 'electron';


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
      </div>
    );
  }
}

export default App;
