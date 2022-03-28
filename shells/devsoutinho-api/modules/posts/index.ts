import path from 'path';
import fs from 'fs/promises';
import { gql } from 'apollo-server-micro';
// Parser Markdown
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import allpostsSlugs from '../../_db/posts';
import { Resolvers, Post, PostType } from '../gql_types';
// https://github.com/omariosouto/mvp-devsoutinho/blob/9217c0c43f1ca5d77664618f6ab393412c12f36c/packages/site/cms/modules/youtube/type.ts
// https://www.apollographql.com/blog/graphql/basics/designing-graphql-mutations/


function slugify(text) 
{
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    Array.from(from).forEach(function( character, i ) {
        text = text.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    });
    return text
        .toString()                     // Cast to string
        .toLowerCase()                  // Convert the string to lowercase letters
        .trim()                         // Remove whitespace from both sides of a string
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/&/g, '-y-')           // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

export const typeDefs = gql`
  # [Query]
  enum PostType {
    YOUTUBE_VIDEO
  }

  type Post {
    title: String
    url: String
    date: String
    postType: PostType
  }

  extend type Query {
    posts: [Post]!
  }

  # [Mutation]
  input CreatePostInput {
    title: String
    url: String
    date: String
  }
  type CreatePostPayload {
    post: Post
  }

  extend type Mutation {
    createYouTubeVideo(input: CreatePostInput!): CreatePostPayload
  }
`;

const resolvers: Resolvers = {
  Query: {
    async posts() {
      // [Get All Posts]
      // Check if is under development
      if (process.env.NODE_ENV === 'development') {
        const postsPath = path.resolve(__dirname, '..', '..', '..', '..', '_db', 'posts');
        const allFileNames = await fs.readdir(postsPath);
        await fs.writeFile(path.resolve(postsPath, 'index.ts'), `export default ${JSON.stringify(allFileNames.filter((fileName) => fileName !== 'index.ts'))};`);
      }

      const allPostsPromises = allpostsSlugs.map(async (slug): Promise<Post> => {
        const BASE_URL = 'https://raw.githubusercontent.com/devsoutinho/mariosouto.com/main/shells/devsoutinho-api/_db/posts/';
        const postContentRaw = await fetch(`${BASE_URL}${slug}`).then((res) => res.text());
        const { data, content } = matter(postContentRaw);
        const contentParsed = await remark().use(html).process(content);
        const post = { data, content: contentParsed.value, };
        return {
          title: post.data.title,
          url: post.data.url,
          postType: post.data.postType,
          date: new Date(post.data.date).toISOString(),
        };
      });
      const promisesSettled = await Promise.allSettled(allPostsPromises);

      return promisesSettled.map((promise) => {
        if (promise.status === 'fulfilled') return promise.value;
      });
    }
  },
  Mutation: {
    async createYouTubeVideo(arg, { input }) {
      const { title, url, date } = input;
      const slug = slugify(title);
      const postType = PostType.YoutubeVideo;
      const parsedDate = new Date(date.replaceAll('/', '-')).toISOString();
      const postContent = `---
title: ${JSON.stringify(title)}
url: ${url}
date: ${parsedDate}
postType: ${postType}
---

No content
`;
      const postsPath = path.resolve(__dirname, '..', '..', '..', '..', '_db', 'posts');
      await fs.writeFile(path.resolve(postsPath, `${slug}.md`), postContent);

      return {
        post: {
          title,
          url,
          postType,
          date: parsedDate,
        }
      }
    }
  },
}

export const youtubeModule = {
  typeDefs,
  resolvers,
};
