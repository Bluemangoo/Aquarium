//Warning: this resolver uses regex
import { Fish } from "../../types/fish";
import checkInList from "../../utils/checkInList";
import axios from "axios";
import { SourceTag } from "../../types/sourceTag";
import bucket from "../bucket";
import env from "../../utils/env";
import getProxyUrl from "../../utils/getProxyUrl";

const sub = new Fish("python");

sub.getUrl = async function(query) {
    const source = checkInList(
        query.source,
        "python",
        ["python", "npmmirror", ...(env.enableProxy ? ["proxy"] : [])]
    );
    const type = checkInList(
        query.type,
        "exe",
        ["exe", "zip"]
    );

    const version = query.version ?? await sub.getVersion(query);

    let prefix = "https://www.python.org/ftp";
    if (source == "npmmirror") {
        prefix = "https://registry.npmmirror.com/-/binary";
    }

    let url = "";

    if (type == "exe") {
        url = `${prefix}/python/${version}/python-${version}-amd64.exe`;
    } else if (type == "zip") {
        url = `${prefix}/python/${version}/python-${version}-embed-amd64.zip`;
    }

    if (env.enableProxy) {
        if (query.source == "proxy") {
            return getProxyUrl(url);
        }
    }
    return url;
};

sub.getVersion = async function(_query) {
    const data = await axios.get("https://www.python.org/downloads/windows/");
    const ver = (<string>data.data).match(/(?<=Latest Python 3 Release - Python ).*(?=<\/a><\/li>)/);
    if (ver == null) {
        throw new Error();
    }
    return ver[0];
};

sub.sources["python"] = new SourceTag("Python", {
    official: true
});
sub.sources["npmmirror"] = new SourceTag("npm mirror", {});


if (env.enableProxy) {
    sub.sources["proxy"] = new SourceTag("本站代理", {});
}

bucket.add(sub);