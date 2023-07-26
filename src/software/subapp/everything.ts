//Warning: this resolver uses regex
import { Fish } from "../../types/fish";
import FileCacher from "../../types/FileCacher";
import bucket from "../bucket";

const sub = new Fish("everything");

const page = new FileCacher("https://www.voidtools.com/");

sub.getUrl = async function(query) {
    return "https//www.voidtools.com" + (await page.data).match(/(?<=class="button" href=").*(?=">Download Installer 64-bit<\/a>)/)[0];
};

sub.getVersion = async function(query) {
    let ver = (await this.getUrl(query)).match(/(?<=Everything-).*(?=.x64)/);
    if (ver == null) {
        throw new Error();
    }
    return ver[0];
};

bucket.add(sub);