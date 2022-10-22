import path from 'path';
import fs from 'fs/promises';
import { gql } from 'apollo-server-micro';
import { Resolvers, Post, PostType } from '../gql_types';
import { postsRepository } from './postsRepository';
import { slugify } from './utils/slugify';

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
    async posts(_, { input } = {}) {
      return await postsRepository().getAllPosts({ input });
    }
  },
  Mutation: {
    async createProductLink(_, { input }) {
      return {
        post: await postsRepository().createPost({ input: { ...input, postType: PostType.ProductLink } }),
      }
    },
    async createYouTubeVideo(_, { input }) {
      return {
        post: await postsRepository().createPost({ input: { ...input, postType: PostType.YoutubeVideo } }),
      };
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
