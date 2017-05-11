import { ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initializeStore } from '../store';
import App from './containers/App';

const store = initializeStore();

ipcRenderer.on('dispatch', (event, arg) => {
  store.dispatch(arg);
});

ReactDOM.render((
  <Provider store={ store }>
    <App />
  </Provider>
), document.getElementById('main'));
