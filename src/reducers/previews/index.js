import * as actions from './constants';

const defaultState = {};
export default function previewReducer(state = defaultState, action) {
  switch(action.type) {
    case  actions.PREVIEW_COMPLETE: {
      const { files, hash, duration } = action;
      return {
        ...state,
        [hash]: {
          ...state[hash],
          processingEnd: Date.now(),
          files,
          duration,
        },
      };
    }
    case actions.REMOVE_PREVIEW: {
      const { hash } = action;
      const cp = { ...state };
      delete cp[hash];
      return cp;
    }
    case actions.GENERATE_PREVIEW: {
      const { hash, name } = action;
      return {
        ...state,
        [hash]: {
          name: name,
          processingStart: Date.now(),
        },
      };
    }
    default: return state;
  }
}
