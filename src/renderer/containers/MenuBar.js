import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

function test() {
  ipcRenderer.send('open_file', { something: 'here' });
}

class MenuBar extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <button onClick={ test }>ADD</button>
      </div>
    );
  }
}

export default MenuBar;
