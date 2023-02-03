import { execSync } from "child_process";

console.log("[DEPLOY_PREVIEW]: START");
const command = "yarn deploy:staging";
const output = execSync(command, { encoding: "utf-8" });
console.log("[DEPLOY_PREVIEW]: END");

console.log(output);

//console.log("[GITHUB_COMMENT]: START");
//console.log("[GITHUB_COMMENT]: END");
