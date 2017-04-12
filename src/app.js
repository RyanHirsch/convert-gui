import { app, BrowserWindow } from 'electron';
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
// shell.exec(cmd, { async: true, silent: true }, function(code, stdout, stderr) {
//   console.log('exit', code); // eslint-disable-line no-console
//   console.log('out', stdout); // eslint-disable-line no-console
//   console.log('err', stderr); // eslint-disable-line no-console
// });

const ffmpeg = spawn('ffmpeg', ['-i', '/Users/ryanhirsch/Downloads/foo.mp4', '/Users/ryanhirsch/Downloads/foobar.mp3']);
ffmpeg
  .on('error', function (err) {
    console.log('err', err); // eslint-disable-line no-console
  })
  .on('exit', function (code) {
    console.log('exit', code); // eslint-disable-line no-console
  })
  .on('message', function (data) {
    console.log('message', data); // eslint-disable-line no-console
  });
ffmpeg.stdout.on('data', function (data) {
  console.log('o data', data); // eslint-disable-line no-console
});
ffmpeg.stdout.on('end', function (data) {
  console.log('o end', data); // eslint-disable-line no-console
});

ffmpeg.stderr.on('data', function (data) {
  console.log('e data', data.toString()); // eslint-disable-line no-console
});
ffmpeg.stderr.on('end', function (data) {
  console.log('e end', data); // eslint-disable-line no-console
});
