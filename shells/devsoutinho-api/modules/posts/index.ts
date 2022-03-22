import path from 'path';
import fs from 'fs/promises';
import { gql } from 'apollo-server-micro';
import allpostsSlugs from '../../_db/posts';
// https://github.com/omariosouto/mvp-devsoutinho/blob/9217c0c43f1ca5d77664618f6ab393412c12f36c/packages/site/cms/modules/youtube/type.ts

export const typeDefs = gql`
  type YouTubeVideo {
    title: String
    url: String
    date: String
  }
  # input QueryYouTubeVideoInput {
  #   _id: String
  #   title: String
  # }
  extend type Query {
    posts: [YouTubeVideo]!
    # youtubeVideo(input: QueryYouTubeVideoInput): YouTubeVideo
  }
`;

const resolvers = {
  Query: {
    async posts() {
      // Check if is under development
      if (process.env.NODE_ENV === 'development') {
        const postsPath = path.resolve(__dirname, '..', '..', '..', '..', '_db', 'posts');
        const output = await fs.readdir(postsPath);
        await fs.writeFile(path.resolve(postsPath, 'index.ts'), `export default ${JSON.stringify(output)};`);
      }

      const allPostsPromises = allpostsSlugs.map(async (slug) => {
        const BASE_URL = 'https://raw.githubusercontent.com/devsoutinho/mariosouto.com/main/shells/devsoutinho-api/_db/posts/';
        const postContent = await fetch(`${BASE_URL}${slug}`);
        console.log(postContent);
      });

      console.log(allpostsSlugs);

      return [
        { title: 'Video 01', url: 'https://youtube.com/1', date: new Date('2020-01-01').toISOString() },
        { title: 'Video 02', url: 'https://youtube.com/2', date: new Date('2020-01-02').toISOString() },
      ]
    }
  },
  Mutation: {},
}

export const youtubeModule = {
  typeDefs,
  resolvers,
};
