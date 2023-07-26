import * as fs from "fs";
import keepFile from "./keepFile";

try {
    fs.mkdirSync(process.cwd() + "/dist");
} catch {
}

