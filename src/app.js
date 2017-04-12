import { app, BrowserWindow } from 'electron';
import { getMilliseconds, getTime } from './utils/progress';
import shell from 'shelljs';
import { spawn } from 'child_process';

const cmd = 'ffmpeg -i ~/Downloads/foo.mp4 ~/Downloads/foobar.mp3';

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

shell.exec('ffprobe ~/Downloads/foo.mp4', { silent: true }, (code, out, err) => {
  const [, length ] = (/Duration: (\S+),\s/.exec(err));
  const total = getMilliseconds(length);

  const ffmpeg = spawn('ffmpeg', ['-i', '/Users/ryanhirsch/Downloads/foo.mp4', '/Users/ryanhirsch/Downloads/foobar.mp3']);
  ffmpeg
    .on('error', function (err) {
      console.log('err', err); // eslint-disable-line no-console
    })
    .on('exit', function (code) {
      console.log('exit', code); // eslint-disable-line no-console
    });

  ffmpeg.stdout.on('end', function (data) {
    logPercent(1);
  });

  ffmpeg.stderr.on('data', function (data) {
    const progressMarker = getTime(data.toString());
    const current = getMilliseconds(progressMarker);
    logPercent(current / total);
  });
});

function logPercent(num) {
  const percent = num * 100;
  console.log(`${percent.toFixed(2)}%`); // eslint-disable-line no-console
}
