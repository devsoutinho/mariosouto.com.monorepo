import { gql, useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from 'external-libs/apollo-client';

export const GET_POSTS = gql`
query($input: PostsInput) {
  posts(input: $input) {
    title
    date
    url
    image
  }
}
`;

export const variables = {
  "input": {
    "limit": 100,
    "filter": {
      "postType": {
        "eq": "YOUTUBE_VIDEO"
      }
    }
  }
};

export const useGetAllYouTubeVideos = () => {
  return {
    client() {
      return useQuery(GET_POSTS, {
        variables
      });
    },
    async server() {
      const apolloClient = initializeApollo();
      
      await apolloClient.query({
        query: GET_POSTS,
        variables,
      });
      return apolloClient;
    }
  }
};
