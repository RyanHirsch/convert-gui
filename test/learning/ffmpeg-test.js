import expect from 'expect';
import { getDuration } from '../../src/utils/ffmpeg';

describe('learning ffmpeg', () => {
  it('gets duration in ms from a file', () => {
    return getDuration('/Users/ryanhirsch/Downloads/foo.mp4')
      .then(duration => {
        expect(duration).toEqual(562520);
      });
  });
});

