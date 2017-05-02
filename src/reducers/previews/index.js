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
          processing: false,
          files,
          duration,
        },
      };
    }
    case actions.GENERATE_PREVIEW: {
      const { hash, name } = action;
      return {
        ...state,
        [hash]: {
          name: name,
          processing: true,
        },
      };
    }
    default: return state;
  }
}
