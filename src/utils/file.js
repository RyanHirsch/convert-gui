import crypto from 'crypto';
import fs from 'fs';

function hashFile(filePath) {
  const hash = crypto.createHash('sha1');
  const stream = fs.createReadStream(filePath);
  return new Promise((resolve, reject) => {
    stream.on('error', err => reject(err));
    stream.on('data', data => hash.update(data, 'utf8'));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

export {
  hashFile,
};
