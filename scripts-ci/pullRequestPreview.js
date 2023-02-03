import { execSync } from "child_process";

// vercel
console.log("[DEPLOY_PREVIEW]: START");
const command = "yarn deploy:staging";
const output = execSync(command, { encoding: "utf-8" });
const outputLines = output.split("\n");
const DEPLOY_URL = outputLines[outputLines.length - 1];
console.log("[DEPLOY_PREVIEW]: END");

console.log(`You can see the deploy preview on ${DEPLOY_URL}`);

// github
console.log("[GITHUB_COMMENT]: START");

const { GITHUB_TOKEN, GITHUB_PR_NUMBER, GITHUB_REPOSITORY } = process.env;
// variavel em markdown
const GH_COMMENT = `
	- Deploy URL: [${vercelUrl}] (${vercelUrl})
`;

//default headers
const defaultHeaders = {};

defaultHeaders["authorization"] = `token ${GITHUB_TOKEN}`;
defaultHeaders["accept"] =
	"application/vnd.github.v3+json; application/vnd.github.antiope-preview+json";
defaultHeaders["content-type"] = "application/json";

console.log("GITHUB_REPOSITORY", GITHUB_REPOSITORY);
console.log("GITHUB_PR_NUMBER", GITHUB_PR_NUMBER);

fetch(
	`https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${GITHUB_PR_NUMBER}/comments`,
	{
		headers: defaultHeaders,
		method: "POST",
		body: JSON.stringify({
			body: GH_COMMENT,
		}),
	}
)
	.then((res) => {
		if (res.ok) return res.json();
		throw new Error(res.statusText);
	})
	.catch((err) => {
		console.log("[COMMENT_ON_GITHUB: ERROR]");
		throw new Error(err);
	})
	.finally(() => {
		console.log("[COMMENT_ON_GITHUB: END]");
	});

console.log("[GITHUB_COMMENT]: END");
