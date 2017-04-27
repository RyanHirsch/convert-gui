import { app, BrowserWindow } from 'electron';
import { createPreviews } from './utils/ffmpeg';
import logger from './utils/logger';
import shell from 'shelljs';

const tmpDir = app.getPath('temp');
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
  mainWindow.loadURL(`file://${__dirname}/renderer/index.html`);

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
