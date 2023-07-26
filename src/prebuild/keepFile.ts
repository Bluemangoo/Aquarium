import * as fs from "fs";

const keepPath = process.cwd() + "/src/prebuild/keep.ts";

fs.writeFileSync(keepPath, "const fs = require(\"fs\");\n");

export default function(file: string) {
    fs.appendFileSync(keepPath,`process.cwd() + "${file}"\n`)
}