import { ipcRenderer } from 'electron';
import ProgressBar from './components/ProgressBar';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render((
  <div>
    <ProgressBar percent={ 0.25 } />
    <ProgressBar percent={ 1 } />
    <ProgressBar percent={ 0 } />
  </div>
), document.getElementById('main'));

ipcRenderer.on('progress', (event, arg) => {
  const { percent } = arg;
  ReactDOM.render((
    <div>
      <ProgressBar percent={ percent } />
      <ProgressBar percent={ 0.25 } />
      <ProgressBar percent={ 0.5 } />
      <pre>{ percent }</pre>
    </div>
  ), document.getElementById('main'));
});
