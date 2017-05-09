import { ipcRenderer } from 'electron';

export function openFileDialog(opts) {
  ipcRenderer.send('open_file', opts);
}

export function processFile(file) {
  ipcRenderer.send('process_file', { file });
}
