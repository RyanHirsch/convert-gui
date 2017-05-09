import shell from 'shelljs';
import path from 'path';
import { spawn } from 'child_process';
import { getMilliseconds, getTime } from './progress';
import { hashFile } from './file';
import logger from './logger';

function createPreviews(videoFile, outputPath, totalFrames = 20) {
  logger.log('silly', `createPreviews for ${videoFile} and saving to ${outputPath}`);
  return Promise.all([ getDuration(videoFile), hashFile(videoFile) ])
    .then(([ duration, hash ]) => {
      const previewFolder = path.join(outputPath, 'previews', hash);
      if(shell.test('-d', previewFolder)) {
        logger.log('silly', `preview folder ${previewFolder} already exists`);
        return {
          hash,
          videoFile,
          previewFolder,
          duration,
          files: shell.ls(previewFolder).map(x => path.join(previewFolder, x)),
        };
      }
      shell.mkdir('-p', previewFolder);
      return new Promise((resolve, reject) => {
        const fps = Math.floor(duration / 1000 / totalFrames);
        shell.exec(`ffmpeg -i "${videoFile}" -vf fps=1/${fps} "${previewFolder}/frame-%03d.jpg"`, { silent: true }, (code, out, err) => {
          if(code !== 0) {
            logger.log('silly', `Preview frames failed to create for ${videoFile}`);
            return reject({ videoFile, previewFolder, err });
          }
          logger.log('silly', `Preview frames extracted successfully for ${videoFile}`);
          return resolve({
            hash,
            videoFile,
            previewFolder,
            duration,
            files: shell.ls(previewFolder).map(x => path.join(previewFolder, x)),
          });
        });
      });
    });
}

function getDuration(file) {
  const start = Date.now();
  logger.log('silly', `getDuration for ${file}`);
  return new Promise((resolve, reject) => {
    shell.exec(`ffprobe "${file}"`, { silent: true }, (code, out, err) => {
      const elapsed = Date.now() - start;
      if(code !== 0) {
        logger.log('silly', `getDuration for ${file} failed after ${elapsed}ms`);
        return reject({ code, out, err });
      }
      logger.log('silly', `getDuration for ${file} was successful after ${elapsed}ms`);
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
