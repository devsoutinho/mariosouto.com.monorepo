import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';
// https://github.com/omariosouto/gh-stars-sync/blob/main/repositories/youtube/index.js

const YOUTUBE_CHANNEL_FEED = process.env.YOUTUBE_CHANNEL_FEED || 'https://www.youtube.com/feeds/videos.xml?channel_id=UCzR2u5RWXWjUh7CwLSvbitA';

const youtubeRepository = {
  async getLast15Uploads() {
    return await fetch(YOUTUBE_CHANNEL_FEED)
      .then(async (res) => {
        const response = await res.text();
        const xmlParser = new XMLParser();
        const parsedResponse = xmlParser.parse(response);
        return parsedResponse.feed.entry.map((video) => {
          const description = video['media:group']['media:description']
            .split('\n')[0]
            .replace(/\\\\o/g, '')
            .replace(/\\o/g, '');

          return {
            id: video['yt:videoId'],
            date: new Date(video.published).toISOString(),
            url: `https://youtu.be/${video['yt:videoId']}`,
            title: video.title,
            description,
            thumbnail: `http://i1.ytimg.com/vi/${video['yt:videoId']}/hqdefault.jpg`,
          };
        });
      })
  }
}

export default async function handler(req, res) {
  const output = await youtubeRepository.getLast15Uploads();
  res.json({
    data: output
  });
}
