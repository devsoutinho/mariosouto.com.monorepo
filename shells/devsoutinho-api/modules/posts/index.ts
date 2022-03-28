import path from 'path';
import fs from 'fs/promises';
import { gql } from 'apollo-server-micro';
import sift from "sift";
// Parser Markdown
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import allpostsSlugs from '../../_db/posts';
import { Resolvers, Post, PostType } from '../gql_types';
// https://github.com/omariosouto/mvp-devsoutinho/blob/9217c0c43f1ca5d77664618f6ab393412c12f36c/packages/site/cms/modules/youtube/type.ts
// https://www.apollographql.com/blog/graphql/basics/designing-graphql-mutations/
// https://www.apollographql.com/blog/graphql/filtering/how-to-search-and-filter-results-with-graphql/

function paginate(array, page_size = 10, page_number = 1) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

async function generatePostsIndex() {
  if (process.env.NODE_ENV === 'development') {
    const postsPath = path.resolve(__dirname, '..', '..', '..', '..', '_db', 'posts');
    const allFileNames = await fs.readdir(postsPath);
    await fs.writeFile(path.resolve(postsPath, 'index.ts'), `export default ${JSON.stringify(allFileNames.filter((fileName) => fileName !== 'index.ts'))};`);
  }
}


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
  # Filter Types
  input DateFilter {
    gte: String
    lt: String
  }

  # ============================================================

  # [Query]
  enum PostType {
    YOUTUBE_VIDEO
  }

  input PostsFilters {
    date: DateFilter
  }
  input PostsInput {
    limit: Int
    offset: Int
    filter: PostsFilters
  }
  type Post {
    title: String
    url: String
    date: String
    excerpt: String
    postType: PostType
  }

  extend type Query {
    posts(input: PostsInput): [Post]!
  }

  # [Mutation]
  input CreatePostInput {
    title: String
    url: String
    date: String
    excerpt: String
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
    async posts(arg, { input } = {}) {
      const { filter, offset, limit } = input || {};
      const filterFormated = Object.entries(filter || {}).reduce((acc, [key, value]) => {
        if(typeof value === 'object' ) {
          return {
            ...acc,
            [key]: {
              $gte: new Date(value.gte).toISOString(),
              $lt: new Date(value.lt).toISOString(),
            }
          }
        }
        return { ...acc };
      }, {});
      // [Get All Posts]
      await generatePostsIndex();

      const allPostsPromises = allpostsSlugs.map(async (slug): Promise<Post> => {
        const BASE_URL = 'https://raw.githubusercontent.com/devsoutinho/mariosouto.com/main/shells/devsoutinho-api/_db/posts/';
        const postContentRaw = await fetch(`${BASE_URL}${slug}`).then((res) => res.text());
        const { data, content } = matter(postContentRaw);
        const contentParsed = await remark().use(html).process(content);
        const post = { data, content: contentParsed.value, };
        return {
          ...post.data,
          title: post.data.title,
          url: post.data.url,
          postType: post.data.postType,
          date: new Date(post.data.date).toISOString(),
        };
      });
      const promisesSettled = await Promise.allSettled(allPostsPromises);
      const initialOutput = promisesSettled.map((promise) => {
        if (promise.status === 'fulfilled') return promise.value;
      });
      const filteredOutput = initialOutput.filter(sift(filterFormated))
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      return paginate(filteredOutput, limit, offset);
    }
  },
  Mutation: {
    async createYouTubeVideo(arg, { input }) {
      const { title, url, date, excerpt } = input;
      const slug = slugify(title);
      const postType = PostType.YoutubeVideo;
      const parsedDate = new Date(date.replaceAll('/', '-')).toISOString();
      const postContent = `---
title: ${JSON.stringify(title)}
url: ${url}
date: ${parsedDate}
postType: ${postType}
excerpt: ${JSON.stringify(excerpt)}
---

No content
`;
      const postsPath = path.resolve(__dirname, '..', '..', '..', '..', '_db', 'posts');
      await fs.writeFile(path.resolve(postsPath, `${slug}.md`), postContent);
      await generatePostsIndex();

      return {
        post: {
          title,
          url,
          postType,
          excerpt,
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
