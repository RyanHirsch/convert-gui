const defaultState = {};

const generatePreview = 'GENERATING_PREVIEW';

export default function previewReducer(state = defaultState, action) {
  switch(action.type) {
    case 'PREVIEW_COMPLETE': {
      const { files, videoFile } = action;
      return {
        ...state,
        [videoFile]: files,
      };
    }
    case 'GENERATING_PREVIEW': {
      const { videoFile } = action;
      return {
        ...state,
        [videoFile]: [],
      };
    }
    default: return state;
  }
}
