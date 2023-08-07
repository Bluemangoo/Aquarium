import * as fs from "fs";
import bucket from "../software/bucket";
import renderer from "../app/renderer";

const keepPath = process.cwd() + "/src/prebuild/keep.ts";

fs.writeFileSync(keepPath, "const fs = require(\"fs\");\n");

function keepFile(file: string) {
    fs.appendFileSync(keepPath, `fs.readFileSync(process.cwd() + "${file}");\n`);
}

function write(projPath: string, date: string) {
    fs.writeFileSync(process.cwd() + "/" + projPath, date);
}

function keep(projPath: string) {
    keepFile(process.cwd() + "/" + projPath);
}

try {
    fs.mkdirSync(process.cwd() + "/dist");
} catch {
}

{
    const path = `index.html`;
    const data = renderer.index();
    write(path, data);
    keep(path);
}

try {
    fs.mkdirSync(process.cwd() + "/fish");
} catch {
}


for (const fish of bucket.fishesList) {
    fs.mkdirSync(process.cwd() + "/fish/" + fish.id);
    const path = `fish/${fish.id}/index.html`;
    const data = renderer.detail(fish);
    write(path, data);
    keep(path);
}

