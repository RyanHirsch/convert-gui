import shell from 'shelljs';
import path from 'path';
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { createPreviews } from '../utils/ffmpeg';
import { hashFile } from '../utils/file';
import logger from '../utils/logger';

import * as previewActions from '../reducers/previews/actions';

const appDir = app.getPath('appData');
let mainWindow = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    show: false,
  });
  const renderer = path.resolve(__dirname, '..', 'renderer');
  mainWindow.loadURL(`file://${renderer}/index.html`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.webContents.send('addHeaderMessage', {
      hasFfmeg: ensure('ffmpeg'),
      hasFfprobe: ensure('ffprobe'),
    });

    process('/Users/ryanhirsch/Downloads/foo.mp4');
    // convert(mainWindow.webContents, 'progress');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    shell.rm('-f', '~/Downloads/foobar.mp3');
  });
});

ipcMain.on('open_file', (event, args) => {
  dialog.showOpenDialog(mainWindow, {
    properties: [ 'openFile', 'openDirectory', 'multiSelections' ],
  }, files => {
    console.log('files', files); // eslint-disable-line no-console
  });
});

function ensure(bin = 'ffmpeg') {
  if(!shell.which(bin)) {
    return `This requires ${bin}`;
  }
}

function clientDispatch(action) {
  mainWindow.webContents.send('dispatch', action);
}
function process(file) {
  hashFile(file)
    .then(hash => {
      clientDispatch(previewActions.generatePreview(file, hash));
    });
  createPreviews(file, appDir)
    .then(({ duration, hash, files }) => {
      clientDispatch(previewActions.previewComplete(hash, files, duration));
    })
  .catch(e => logger('failed to create previews', e));
}

export function openDirectory() {
  dialog.showOpenDialog(mainWindow, {
    properties: [ 'openDirectory' ],
  }, files => {
    console.log('files', files); // eslint-disable-line no-console
  });
}
