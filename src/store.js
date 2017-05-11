import { createStore, applyMiddleware, compose } from 'redux';
import { loadPreviews, savePreviews } from './renderer/api/localStorage';
import appReducers from './reducers';
import DevTools from './renderer/containers/DevTools';

let store;
export function initializeStore(initialState = {}) {
  const middleware = [];
  const state = {
    ...initialState,
    previews: loadPreviews(),
  };
  const enhancer = compose(
  // Middleware you want to use in development:
    applyMiddleware(...middleware),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument(),
  );

  store = createStore(
    appReducers,
    state,
    enhancer,
  );
  return ensurePersistance(store);
}

function selectPreviews(state) {
  return state.previews;
}

function ensurePersistance(store) {
  let currentValue = loadPreviews();
  function handleChange() {
    const previousValue = currentValue;
    currentValue = selectPreviews(store.getState());

    if(previousValue !== currentValue) {
      savePreviews(currentValue);
    }
  }
  store.subscribe(handleChange);
  return store;
}
