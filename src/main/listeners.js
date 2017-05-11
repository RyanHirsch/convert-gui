import { app, ipcMain, dialog } from 'electron';
import { createPreviews } from '../utils/ffmpeg';
import { hashFile } from '../utils/file';
import logger from '../utils/logger';
import * as previewActions from '../reducers/previews/actions';

const appDir = app.getPath('appData');
export function registerListeners(mainWindow) {
  function clientDispatch(action) {
    mainWindow.webContents.send('dispatch', action);
  }

  ipcMain.on('process_file', (event, { file }) => {
    hashFile(file)
      .then(hash => {
        clientDispatch(previewActions.generatePreview(file, hash));
      });
    createPreviews(file, appDir)
      .then(({ duration, hash, files }) => {
        clientDispatch(previewActions.previewComplete(hash, files, duration));
      })
    .catch(e => logger('failed to create previews', { ...e, file }));
  });

  ipcMain.on('open_file', (event, args) => {
    dialog.showOpenDialog(mainWindow, {
      properties: args.properties || [ 'openFile', 'openDirectory', 'multiSelections' ],
      filters: args.filters,
    }, files => {
      mainWindow.webContents.send(args.cbChannel, { files });
    });
  });
}
