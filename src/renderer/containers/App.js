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
    ipcRenderer.on('store_msg', (event, arg) => {
      previewReducer({}, arg);
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


const defaultState = {};
function previewReducer(state = defaultState, action) {
  switch(action.type) {
    case 'PREVIEW_COMPLETE': {
      const { files, videoFile } = action;
      return {
        ...state,
        [videoFile]: files,
      };
    }
    case 'GENERATING_PREVIEW': {
      const { videoFile } = action;
      return {
        ...state,
        [videoFile]: [],
      };
    }
    default: return state;
  }
}
