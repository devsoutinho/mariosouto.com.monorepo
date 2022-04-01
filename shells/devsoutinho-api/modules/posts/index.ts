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
import { postsRepository } from './postsRepository';



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
    PRODUCT_LINK
  }

  input PostsFilters {
    date: FieldFilter
    postType: FieldFilter
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
  input CreateProductInput {
    title: String!
    url: String!
    date: String
    excerpt: String
  }
  type CreatePostPayload {
    post: Post
  }

  extend type Mutation {
    createYouTubeVideo(input: CreatePostInput!): CreatePostPayload
    createProductLink(input: CreateProductInput!): CreatePostPayload
  }
`;

const resolvers: Resolvers = {
  Query: {
    async posts(arg, { input } = {}) {
      return await postsRepository().getAllPosts({ input });
    }
  },
  Mutation: {
    async createProductLink(arg, { input }) {
      const { title, url, date, excerpt } = input;
      const slug = slugify(title);
      const postType = PostType.ProductLink;
      const parsedDate = new Date(date?.replaceAll('/', '-')|| new Date().toISOString()).toISOString();
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
      // await generatePostsIndex();

      return {
        post: {
          title,
          url,
          postType,
          excerpt,
          date: parsedDate,
        }
      }
    },
    async createYouTubeVideo(arg, { input }) {
      const { title, url, date, excerpt } = input;
      const slug = slugify(title);
      const postType = PostType.YoutubeVideo;
      const parsedDate = new Date(date?.replaceAll('/', '-')|| new Date().toISOString()).toISOString();
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
      // await generatePostsIndex();

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

export const postsModule = {
  typeDefs,
  resolvers,
};



// References
/*
// https://github.com/omariosouto/mvp-devsoutinho/blob/9217c0c43f1ca5d77664618f6ab393412c12f36c/packages/site/cms/modules/youtube/type.ts
// https://www.apollographql.com/blog/graphql/basics/designing-graphql-mutations/
// https://www.apollographql.com/blog/graphql/filtering/how-to-search-and-filter-results-with-graphql/
*/
