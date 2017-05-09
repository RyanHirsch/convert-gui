import shell from 'shelljs';
import path from 'path';
import { app, BrowserWindow } from 'electron';
import { registerListeners } from './listeners';

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
  registerListeners(mainWindow);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.webContents.send('addHeaderMessage', {
      hasFfmeg: ensure('ffmpeg'),
      hasFfprobe: ensure('ffprobe'),
    });

    // process('/Users/ryanhirsch/Downloads/foo.mp4');
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
