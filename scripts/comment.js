import { GitHubService } from './services/GitHubService.js';

console.log(process.argv.at(-1));

// [Enviroment Variables]
const {
  GITHUB_TOKEN,
  GITHUB_REPOSITORY,
  GITHUB_PR_NUMBER,
} = process.env;
// =========================

console.log('GITHUB_REPOSITORY:', GITHUB_REPOSITORY);
console.log('GITHUB_PR_NUMBER:', GITHUB_PR_NUMBER);

GitHubService(GITHUB_TOKEN)
  .commentOnGithub({
    commentBody: process.argv.at(-1) || "Empty comment...",
    GITHUB_REPOSITORY: GITHUB_REPOSITORY,
    PR_NUMBER: GITHUB_PR_NUMBER,
  })

