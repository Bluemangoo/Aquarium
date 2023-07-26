import * as fs from "fs";

export default function checkPrebuildFileOr(file: string, or: ()=>any) {
    try {
        fs.accessSync(process.cwd() + "/dist/" + file, fs.constants.F_OK);
        return fs.readFileSync(process.cwd() + "/dist/" + file).toString();
    } catch (err) {
        return or();
    }
}