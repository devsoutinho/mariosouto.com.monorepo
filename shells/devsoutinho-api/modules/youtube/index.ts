import { gql } from 'apollo-server-micro';
import { PostType, Resolvers, YouTubeVideo, YouTubeVideosInput } from '../gql_types';
import { postsRepository } from '../posts/postsRepository';
import { getYouTubeVideosFromFeed } from './getYouTubeVideosFromFeed';

export const typeDefs = gql`
  # Defaults
  input YouTubeVideosFilters {
    date: FieldFilter
    postType: FieldFilter
  }
  input YouTubeVideosInput {
    limit: Int
    offset: Int
    filter: YouTubeVideosFilters
  }

  # ============================================================
  # Base Type
  type YouTubeVideo {
    title: String
    url: String
    date: String
    excerpt: String
  }

  type CreateYouTubeVideoPayload {
    youtubeVideos: [YouTubeVideo]
  }
  extend type Mutation {
    """
    This mutation must called only in CI environment.
    - 1. It hits YouTube feed URL.
    - 2. Get the latest vídeos.
    - 3. Try to sync them with the local cache of videos.
    """
    syncYouTubeVideos: CreateYouTubeVideoPayload
  }
`;

const resolvers: Resolvers = {
  Query: {},
  Mutation: {
    async syncYouTubeVideos() {
      const youtubeVideosCached = await postsRepository().getAllPostsByPostType(PostType.YoutubeVideo);
      const youtubeVideosFromFeed = await getYouTubeVideosFromFeed();

      // const createdVideos = await postsRepository().createPosts(youtubeVideosFromFeed);

      return {
        youtubeVideos: [],
      };
    }
  },
};

export const youtubeModule = {
  typeDefs,
  resolvers,
};
