import { createStore, applyMiddleware, compose } from 'redux';
import appReducers from './reducers';
import DevTools from './renderer/containers/DevTools';

function initializeStore(initialState) {
  const middleware = [];
  const enhancer = compose(
  // Middleware you want to use in development:
    applyMiddleware(...middleware),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument(),
  );

  return createStore(
    appReducers,
    initialState,
    enhancer,
  );
}

export {
  initializeStore,
};
