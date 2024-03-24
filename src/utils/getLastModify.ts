import { execSync } from "node:child_process";

export default function getLastModify(file: string) {
    return new Date(execSync("git log -1 --pretty=\"format:%ci\" " + file).toString());
}