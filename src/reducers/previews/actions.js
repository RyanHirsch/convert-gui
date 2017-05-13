import * as actions from './constants';

export function generatePreview(name, hash) {
  return {
    type: actions.GENERATE_PREVIEW,
    hash,
    name,
  };
}

export function previewComplete(hash, files, duration) {
  return {
    type: actions.PREVIEW_COMPLETE,
    hash,
    files,
    duration,
  };
}

export function removePreview(hash) {
  return {
    type: actions.REMOVE_PREVIEW,
    hash,
  };
}
