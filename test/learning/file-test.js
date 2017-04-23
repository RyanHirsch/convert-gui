import expect from 'expect';
import { hashFile } from '../../src/utils/file';

describe('learning file', () => {
  it('creates a hash from a file', () => {
    return hashFile('/Users/ryanhirsch/Downloads/foo.mp4')
      .then(hash => {
        expect(hash).toExist();
      });
  });
});
