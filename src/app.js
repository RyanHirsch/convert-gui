import { app, BrowserWindow } from 'electron';
import shell from 'shelljs';

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

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.webContents.send('addHeaderMessage', {
      id: Date.now(),
      hasFfmeg: ensure('ffmpeg'),
    });
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
  });
});
