import { getYoutubeId } from '.';

describe('getYouTubeID()', () => {
  describe('when receives a youtube URL', () => {
    it('and it is the default url, return the id', () => {
      expect(getYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toEqual('dQw4w9WgXcQ');
    });
    it('and it is an embeded url, return the id', () => {
      expect(getYoutubeId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toEqual('dQw4w9WgXcQ');
    });
    it('and it is an short url, return the id', () => {
      expect(getYoutubeId('https://youtu.be/dQw4w9WgXcQ')).toEqual('dQw4w9WgXcQ');
    });
  })
})
