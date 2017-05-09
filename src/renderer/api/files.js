import { ipcRenderer } from 'electron';

function openFileDialog(opts) {
  ipcRenderer.send('open_file', opts);
}

export {
  openFileDialog,
};
