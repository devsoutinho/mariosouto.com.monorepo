import lodash from 'lodash';
import { gql } from 'apollo-server-micro';
import { PostType, Resolvers, YouTubeVideo } from '../gql_types';
import { postsRepository } from '../posts/postsRepository';
import { getYouTubeVideosFromFeed } from './getYouTubeVideosFromFeed';

export const typeDefs = gql`
  # Defaults
  input YouTubeVideosFilters {
    date: FieldFilter
    postType: FieldFilter
  }
  input YouTubeVideoInput {
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

  # Query
  extend type Query {
    # youtubeVideo(input: YouTubeVideoInput): YouTubeVideo
    youtubeVideos(input: YouTubeVideoInput): [YouTubeVideo]!
  }
  
  # Mutation
  type CreateYouTubeVideosPayload {
    youtubeVideos: [YouTubeVideo]
  }
  extend type Mutation {
    """
    This mutation must called only in CI environment.
    - 1. It hits YouTube feed URL.
    - 2. Get the latest vídeos.
    - 3. Try to sync them with the local cache of videos.
    """
    syncYouTubeVideos: CreateYouTubeVideosPayload
  }
`;

const resolvers: Resolvers = {
  Query: {
    async youtubeVideos(_, { input } = {}) {
      const youtubeVideos = await postsRepository().getAllPostsByPostType(PostType.YoutubeVideo, { input });
      return youtubeVideos;
    }
  },
  Mutation: {
    async syncYouTubeVideos(): Promise<any> {
      // Get all needed data;
      const youtubeVideosCached = await postsRepository().getAllPostsByPostType(PostType.YoutubeVideo, { input: {
        limit: 100,
      } });
      const youtubeVideosFromFeed = await getYouTubeVideosFromFeed();
      const youtubeVideosFromFeedFormated: YouTubeVideo[] = youtubeVideosFromFeed.map((youtubeVideoFromFeed) => {
        return {
          title: youtubeVideoFromFeed.title,
          url: youtubeVideoFromFeed.url,
          date: youtubeVideoFromFeed.date,
          excerpt: youtubeVideoFromFeed.description,
        }
      });
      // Get difference between 2 arrays
      function differenceByUrl(arr1, arr2) {
        const map1 = new Map();
        arr1.forEach(item => map1.set(item.url, item));
        const map2 = new Map();
        arr2.forEach(item => map2.set(item.url, item));
        console.log(map1.keys());
        console.log(map2.keys());
        const diff = lodash.difference(
          [...map1.keys() as any],
          [...map2.keys() as any]
        );

        return diff.map((url) => {
          if(map1.get(url)) {
            return map1.get(url);
          }
          return map2.get(url);
        });
      }
      const youtubeVideosToCreate = differenceByUrl(youtubeVideosFromFeedFormated, youtubeVideosCached);
      console.log('createdVideos', youtubeVideosToCreate);
      // Create the videos
      const createdVideos = await postsRepository().createPostsByPostType(PostType.YoutubeVideo, {
        input: {
          posts: youtubeVideosToCreate,
        }
      });

      // Send createdVideos to:
      /*
      - GitHub Stars: https://github.com/omariosouto/gh-stars-sync/blob/main/repositories/githubStars/index.js
      - Microsoft MVP: https://gist.github.com/ErickWendel/492283ed1807cb8a5484dc1f0b9a9b94
      */


      return {
        youtubeVideos: createdVideos,
      };
    }
  },
};

export const youtubeModule = {
  typeDefs,
  resolvers,
};
