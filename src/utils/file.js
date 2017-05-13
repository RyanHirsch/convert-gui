import logger from './logger';
import crypto from 'crypto';
import fs from 'fs';

function hashFile(filePath) {
  const start = Date.now();
  const hash = crypto.createHash('sha1');
  const stream = fs.createReadStream(filePath);
  return new Promise((resolve, reject) => {
    stream.on('error', err => reject(err));
    stream.on('data', data => hash.update(data, 'utf8'));
    stream.on('end', () => {
      const computedHash = hash.digest('hex');
      logger.log('silly', `Completed hash for ${filePath} (${computedHash}) ${Date.now() - start}ms`);
      resolve(computedHash);
    });
  });
}

export {
  hashFile,
};
