import { app, BrowserWindow } from 'electron';
import { createPreviews } from './utils/ffmpeg';
import logger from './utils/logger';
import shell from 'shelljs';

const tmpDir = app.getPath('temp');
let mainWindow = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 580,
    height: 365,
    show: false,
  });
  mainWindow.loadURL(`file://${__dirname}/renderer/index.html`);
  createPreviews('~/Downloads/foo.mp4', tmpDir)
    .then(({ videoFile, files }) => {
      mainWindow.webContents.send('store_msg', {
        type: 'PREVIEW_COMPLETE',
        videoFile,
        files,
      });
    })
    .catch(e => logger('failed to create previews', e));


  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.webContents.send('addHeaderMessage', {
      hasFfmeg: ensure('ffmpeg'),
      hasFfprobe: ensure('ffprobe'),
    });
    // convert(mainWindow.webContents, 'progress');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    shell.rm('-f', '~/Downloads/foobar.mp3');
  });
});

function ensure(bin = 'ffmpeg') {
  if(!shell.which(bin)) {
    return `This requires ${bin}`;
  }
}
