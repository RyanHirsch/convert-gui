import createHash from 'sha.js';
import { spawn } from 'child_process';
import shell from 'shelljs';
import { getMilliseconds, getTime } from './progress';
import path from 'path';

const sha256 = createHash('sha256');

function createPreviews(videoFile, dir) {
  const hashPath = sha256.update(`${videoFile}-${Date.now()}`, 'utf8').digest('hex');
  const outputPath = path.join(path.resolve(dir), hashPath);
  shell.mkdir('-p', outputPath);
  return new Promise((resolve, reject) => {
    shell.exec(`ffmpeg -i ${videoFile} -vf fps=1/120 ${outputPath}/frame-%03d.jpg`, { silent: true }, (code, out, err) => {
      if(code !== 0) {
        return reject({ videoFile, dir, err });
      }
      return resolve({
        videoFile,
        outputPath,
        files: shell.ls(outputPath).map(x => path.join(outputPath, x)),
      });
    });
  });
}

function getDuration(file) {
  return new Promise((resolve, reject) => {
    shell.exec(`ffprobe ${file}`, { silent: true }, (code, out, err) => {
      if(code !== 0) {
        return reject({ code, out, err });
      }
      const [, length ] = (/Duration: (\S+),\s/.exec(err));
      return resolve(getMilliseconds(length));
    });
  });
}

function convert(webContents, topic) {
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
      webContents.send(topic, { percent: 1 });
    });

    ffmpeg.stderr.on('data', function (data) {
      const progressMarker = getTime(data.toString());
      const current = getMilliseconds(progressMarker);
      webContents.send(topic, { percent: current / total });
    });
  });
}

export {
  createPreviews,
  getDuration,
  convert,
};
