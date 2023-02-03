import { execSync } from "child_process";

const command = "ls -la";

const output = execSync(command).toString();

console.log(output);
