const previews = 'PREVIEWS';

function save(key) {
  return state => {
    window.localStorage.setItem(key, JSON.stringify(state));
    return state;
  };
}

function load(key) {
  return () => {
    try {
      const state = window.localStorage.getItem(key);
      if(state === null) {
        return undefined;
      }
      return JSON.parse(state);
    }
    catch(e) {
      return undefined;
    }
  };
}

export const savePreviews = save(previews);
export const loadPreviews = load(previews);
