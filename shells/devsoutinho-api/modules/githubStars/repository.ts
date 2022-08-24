// import { differenceBy } from 'lodash';
import { getYouTubeVideoId } from "../../infra/getYouTubeVideoId";
// import fetch from 'node-fetch';
const GH_STARS_TOKEN = process.env.GH_STARS_TOKEN;
const GH_STARS_ENDPOINT = 'https://api-stars.github.com/';

export async function getAllGitHubContributions() {
  return await fetch(GH_STARS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: GH_STARS_TOKEN,
    },
    body: JSON.stringify({
      query: `
        query {
          contributions {
            title
            url
          }
        }
        `,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.data.contributions.map(({ url, ...rest }) => {
        if (url.includes('youtu')) {
          return {
            url: `https://youtu.be/${getYouTubeVideoId(url)}`,
            ...rest,
          };
        }

        return { url, ...rest };
      })
    })
}

export async function publishContributionsToGitHub(newContributions: any) {
  const query = `
      mutation($data: [ContributionInput]) {
        createContributions(data: $data) {
          id
        }
      }
    `;
  console.log(query);

  return await fetch(GH_STARS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: GH_STARS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: {
        data: newContributions,
      },
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.errors) {
        console.log(JSON.stringify(response.errors, null, 4));
        throw new Error(response.errors.message);
      };
      console.log('GH_REGISTRY', response)
    });
}

