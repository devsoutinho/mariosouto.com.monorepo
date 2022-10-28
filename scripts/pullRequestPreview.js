import { execSync } from 'child_process';
import { GitHubService } from './services/GitHubService.js';

// [Enviroment Variables]
const {
    GITHUB_TOKEN,
    GITHUB_REPOSITORY,
    GITHUB_PR_NUMBER,
} = process.env;
// =========================

// [Deploy Web Preview - Vercel Specific]
const command = `melos deploy_web`;
const output = execSync(command, { encoding: "utf-8" });
// =========================

const vercelUrl = output.split('\n')[4];
console.log(output.split('\n'));

// [Comment to GitHub]
GitHubService(GITHUB_TOKEN)
    .commentOnGithub({
        PR_NUMBER: GITHUB_PR_NUMBER,
        GITHUB_REPOSITORY,
        commentBody: (
`
- Deploy URL: [${vercelUrl}](${vercelUrl})
`
        )
    })
// =========================
