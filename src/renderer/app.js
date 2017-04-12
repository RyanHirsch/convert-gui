import { ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<h1>Hello World</h1>, document.getElementById('main'));
ipcRenderer.on('addHeaderMessage', (event, arg) => {
  console.log('GOT IT', arg); // eslint-disable-line no-console
  ReactDOM.render(<pre>{ JSON.stringify(arg, null, 2) }</pre>, document.getElementById('main'));
});
