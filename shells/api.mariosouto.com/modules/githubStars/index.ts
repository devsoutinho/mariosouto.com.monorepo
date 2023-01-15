import { gql } from 'apollo-server-micro';
import { differenceBy } from 'lodash';
import { PostType, Resolvers, YouTubeVideo } from '../gql_types';
import { postsRepository } from "../posts/postsRepository";
import { getAllGitHubContributions, publishContributionsToGitHub } from "./repository";

export const typeDefs = gql`
  type Contribution {
    title: String
  }

  type SyncGitHubContributionsPayload {
    newContributions: [Contribution]
  }
  extend type Mutation {
    syncGitHubContributions: SyncGitHubContributionsPayload
  }
`;

const resolvers = {
  Query: {},
  Mutation: {
    async syncGitHubContributions(): Promise<any> {
      try {
        const githubContributions = await getAllGitHubContributions();
        const youtubeVideos = await postsRepository().getAllPostsByPostType(PostType.YoutubeVideo, {
          "input": {
            "limit": 1000
          }
        });
        const newYouTubeContributions = differenceBy(youtubeVideos, githubContributions, 'url').map((video) => {
          return {
            title: video.title,
            url: video.url,
            description: video.excerpt,
            type: "VIDEO_PODCAST",
            date: video.date
          }
        });
        
        console.log("[SYNC:githubContributions]", githubContributions.length);
        console.log("[SYNC:youtubeVideos]", youtubeVideos.length);
        console.log("[SYNC:newYouTubeContributions]", newYouTubeContributions.length);
        if(newYouTubeContributions.length) {
          await publishContributionsToGitHub(newYouTubeContributions);
        }
  
        return {
          newContributions: newYouTubeContributions,
        };
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  },
};

export const githubStarsModule = {
  typeDefs,
  resolvers,
};
