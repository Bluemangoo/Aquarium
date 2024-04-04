//Warning: this resolver uses regex
import { Fish } from "../../types/fish";
import FileCacher from "../../types/fileCacher";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";
import env from "../../utils/env";
import getProxyUrl from "../../utils/getProxyUrl";

const sub = new Fish("everything");

const page = new FileCacher("https://www.voidtools.com/");

sub.getUrl = async function(query) {
    const url= "https://www.voidtools.com" + (await page.data).match(/(?<=class="button" href=").*(?=">Download Installer 64-bit<\/a>)/)[0];
    if (env.enableProxy) {
        if (query.source == "proxy") {
            return getProxyUrl(url);
        }
    }
    return url;
};

sub.getVersion = async function(_query) {
    let ver = (await this.getUrl({})).match(/(?<=Everything-).*(?=.x64)/);
    if (ver == null) {
        throw new Error();
    }
    return ver[0];
};

sub.sources["voidtools"] = new SourceTag("voidtools", {
    official: true
});

if (env.enableProxy) {
    sub.sources["proxy"] = new SourceTag("本站代理", {});
}

bucket.add(sub);