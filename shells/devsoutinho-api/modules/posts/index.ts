import path from 'path';
import fs from 'fs/promises';
import { gql } from 'apollo-server-micro';
// Parser Markdown
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
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
      // [Get All Posts]
      // Check if is under development
      if (process.env.NODE_ENV === 'development') {
        const postsPath = path.resolve(__dirname, '..', '..', '..', '..', '_db', 'posts');
        const allFileNames = await fs.readdir(postsPath);
        await fs.writeFile(path.resolve(postsPath, 'index.ts'), `export default ${JSON.stringify(allFileNames.filter((fileName)=> fileName !== 'index.ts'))};`);
      }

      const allPostsPromises = allpostsSlugs.map(async (slug) => {
        const BASE_URL = 'https://raw.githubusercontent.com/devsoutinho/mariosouto.com/main/shells/devsoutinho-api/_db/posts/';
        const postContentRaw = await fetch(`${BASE_URL}${slug}`).then((res) => res.text());
        const { data, content } = matter(postContentRaw);
        const contentParsed = await remark().use(html).process(content);
        const post = { data, content: contentParsed.value, };

        return {
          title: post.data.title,
          url: post.data.url,
          date: new Date(post.data.date).toISOString(),
        };
      });
      const promisesSettled = await Promise.allSettled(allPostsPromises);
      
      return promisesSettled.map((promise: any) => {
        if (promise.value) return promise.value;
      });
    }
  },
  Mutation: {},
}

export const youtubeModule = {
  typeDefs,
  resolvers,
};
