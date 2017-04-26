import proxyquire from 'proxyquire';
import expect from 'expect';

describe('ffmpeg', () => {
  it('creates previews', () => {
    const hash = 'fff';
    const test = expect.createSpy().andReturn(false);
    const hashFile = expect.createSpy().andReturn(Promise.resolve(hash));
    const exec = expect.createSpy().andCall(function(cmd, options, cb) {
      cb(0, '', 'Duration: 00:00:01.03, ');
    });
    const ls = expect.createSpy().andReturn([ 'a', 'b', 'c' ]);
    const mkdir = expect.createSpy();
    const ffmpeg = proxyquire('../../src/utils/ffmpeg', {
      shelljs: {
        exec,
        mkdir,
        ls,
        test,
      },
      './file': {
        hashFile,
      },
    });
    const outputPath = '/some/tmp/path';
    const videoFile = '/a/b/foo.mp4';
    return ffmpeg.createPreviews(videoFile, outputPath)
      .then(results => {
        expect(mkdir).toHaveBeenCalledWith('-p', `${outputPath}/previews/${hash}`);
        expect(exec.calls[1].arguments[0]).toEqual(`ffmpeg -i "${videoFile}" -vf fps=1/0 "${outputPath}/previews/${hash}/frame-%03d.jpg"`);

        expect(results).toInclude({ videoFile });
        expect(results).toInclude({ previewFolder: `${outputPath}/previews/${hash}` });
        expect(results).toInclude({ duration: 1030 });
        expect(results).toInclude({
          files: [
            `${outputPath}/previews/${hash}/a`,
            `${outputPath}/previews/${hash}/b`,
            `${outputPath}/previews/${hash}/c`,
          ],
        });
      });
  });
});
