import { ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { initializeStore } from '../store';
import App from './containers/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = initializeStore();

ipcRenderer.on('dispatch', (event, arg) => {
  store.dispatch(arg);
});

ReactDOM.render((
  <MuiThemeProvider>
    <Provider store={ store }>
      <App />
    </Provider>
  </MuiThemeProvider>
), document.getElementById('main'));
