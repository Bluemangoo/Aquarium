import * as fs from "fs";

const keepPath = process.cwd() + "/src/prebuild/keep.ts";

fs.writeFileSync(keepPath, 'const fs = require("fs");\n');

function keep(file: string) {
    fs.appendFileSync(keepPath, `fs.readFileSync(process.cwd() + "${file}");\n`);
}

try {
    fs.mkdirSync(process.cwd() + "/dist");
} catch {}

keep("/dist/css/main.css");
