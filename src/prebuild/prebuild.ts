import * as fs from "fs";
import bucket from "../software/bucket";
import renderer from "../app/renderer";
import * as htmlMinifier from "html-minifier";

const keepPath = process.cwd() + "/src/prebuild/keep.ts";
// lib
function keepFile(projPath: string) {
    fs.appendFileSync(keepPath, `fs.readFileSync(process.cwd() + "/${projPath}");\n`);
}

function write(projPath: string, date: string) {
    fs.writeFileSync(process.cwd() + "/" + projPath, date);
}

function mkdir(projPath: string) {
    try {
        fs.mkdirSync(process.cwd() + "/" + projPath);
    } catch {
    }
}

function getAllFilesInDirectory(dirPath: string, fileList: string[] = []) {
    const files = fs.readdirSync(process.cwd() + "/" + dirPath);

    files.forEach(file => {
        const filePath = process.cwd() + "/" + dirPath + "/" + file;
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            getAllFilesInDirectory(dirPath + "/" + file, fileList);
        } else if (stats.isFile()) {
            fileList.push(dirPath + "/" + file);
        }
    });

    return fileList;
}

function keepDir(dir: string) {
    const list = getAllFilesInDirectory(dir);
    for (const k of list) {
        keepFile(k);
    }
}

function minify(data: string): string {
    return htmlMinifier.minify(data, {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
    });
}

// prebuild start
fs.writeFileSync(keepPath, "import * as fs from \"fs\";\n");

mkdir("dist")

{
    const path = `dist/index.html`;
    const data = minify(renderer.index());
    write(path, data);
}

mkdir("dist/settings");
{
    const path = `dist/settings/index.html`;
    const data = minify(renderer.settings());
    write(path, data);
}

mkdir("dist/fish");


for (const fish of bucket.fishesList) {
    mkdir("dist/fish/" + fish.id);
    const path = `dist/fish/${fish.id}/index.html`;
    const data = minify(renderer.detail(fish));
    write(path, data);
}

keepFile("dist");
keepDir("src/app/layout");
keepDir("js");