import React, { Component } from 'react';
import { openFileDialog, processFile } from '../api/files';
import { ipcRenderer } from 'electron';

const FILE_CALLBACK_CHANNEL = 'file-open';
const openFileOptions = {
  cbChannel: FILE_CALLBACK_CHANNEL,
  properties: [ 'openFile' ],
  filters: [{
    name: 'Videos', extensions: [ 'mkv', 'avi', 'mp4' ],
  }],
};

class MenuBar extends Component {
  constructor() {
    super();
    ipcRenderer.on(FILE_CALLBACK_CHANNEL, (event, arg) => this.filesOpened(arg));
  }
  filesOpened({ files }) {
    (files || []).forEach(processFile);
  }
  render() {
    return (
      <div>
        <button onClick={ () => openFileDialog(openFileOptions) }>Open File</button>
      </div>
    );
  }
}

export default MenuBar;
