import * as fs from "fs";
import bucket from "../software/bucket";
import renderer from "../app/renderer";
import * as htmlMinifier from "html-minifier";
import * as uglifyJs from "uglify-js";
import * as CleanCSS from "clean-css";
import searchFile from "../utils/searchFile";

const keepPath = process.cwd() + "/src/prebuild/keep.ts";

const cleanCSS = new CleanCSS({
    level: {
        2: {
            mergeAdjacentRules: true,
            mergeIntoShorthands: true,
            mergeMedia: true,
            mergeNonAdjacentRules: true,
            mergeSemantically: false,
            overrideProperties: true,
            removeEmpty: true,
            reduceNonAdjacentRules: true,
            removeDuplicateFontRules: true,
            removeDuplicateMediaBlocks: true,
            removeDuplicateRules: true,
            removeUnusedAtRules: false,
            restructureRules: false
        }
    }
});

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

function minifyHTML(data: string): string {
    return htmlMinifier.minify(data, {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
    });
}

function minifyJS(data: string): string {
    return uglifyJs.minify(data, {
        mangle: true
    }).code;
}

function minifyCSS(data: string): string {
    return cleanCSS.minify(data).styles;
}

// prebuild start
fs.writeFileSync(keepPath, "import * as fs from \"fs\";\n");

mkdir("dist");

// `/index.html`
{
    const path = `dist/index.html`;
    const data = minifyHTML(renderer.index());
    write(path, data);
}
// `/404.html`
{
    const path = `dist/404.html`;
    const data = minifyHTML(renderer._404());
    write(path, data);
}

// `/settings/`
mkdir("dist/settings");
{
    const path = `dist/settings/index.html`;
    const data = minifyHTML(renderer.settings());
    write(path, data);
}

// `/search/`
mkdir("dist/search");
{
    const path = `dist/search/index.html`;
    const data = minifyHTML(renderer.search());
    write(path, data);
}

// `/fish/*`
mkdir("dist/fish");
for (const fish of bucket.fishesList) {
    mkdir("dist/fish/" + fish.id);
    const path = `dist/fish/${fish.id}/index.html`;
    const data = minifyHTML(renderer.detail(fish));
    write(path, data);
}

// `/js/*`
mkdir("dist/js");
{
    const list = getAllFilesInDirectory("src/app/js");
    for (const k of list) {
        const path = "dist" + k.slice(7);
        const data = minifyJS(fs.readFileSync(process.cwd() + "/" + k).toString());
        write(path, data);
    }
}

// `/css/main.css`
{
    const path = "dist/css/main.css";
    const data = minifyCSS(fs.readFileSync(process.cwd() + "/" + path).toString());
    write(path, data);
}

// `/api/search.json`
mkdir("dist/api");
{
    write("dist/api/search.json", JSON.stringify(searchFile()));
}


keepFile("dist");
keepDir("src/app/layout");