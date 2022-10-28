const fetchModule = fetch;

export function GitHubService(GITHUB_TOKEN = 'not found', fetch = fetchModule) {
  const BASE_URL = 'https://api.github.com';
  const defaultHeaders = {
    authorization: `token ${GITHUB_TOKEN}`,
    accept: 'application/vnd.github.v3+json; application/vnd.github.antiope-preview+json',
    'content-type': 'application/json',
  };

  return {
    commentOnGithub({
      commentBody,
      GITHUB_REPOSITORY,
      PR_NUMBER,
    }) {
      console.log('\n\n[commentOnGithub_start]');

      const URL = `${BASE_URL}/repos/${GITHUB_REPOSITORY}/issues/${PR_NUMBER}/comments`;
      console.log(URL);
      fetch(URL, {
        headers: defaultHeaders,
        method: 'POST',
        body: JSON.stringify({
          body: commentBody,
        }),
      })
        .then(function responseHandler(response) {
          if (response.ok) return response.json();
          throw new Error(response.statusText);
        })
        .catch(err => { throw err; })
        .finally(() => console.log('[commentOnGithub_finish]'));
    },
  };
}
