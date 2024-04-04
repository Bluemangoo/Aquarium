import { Fish } from "../../types/fish";
import bucket from "../bucket";
import { Query } from "../../types/resolver";
import axios from "axios";
import notNull from "../../utils/notNull";
import * as path from "path";
import github from "../../utils/github";
import { SourceTag } from "../../types/sourceTag";
import addGithubTag from "../../utils/githubTag";
import env from "../../utils/env";
import getProxyUrl from "../../utils/getProxyUrl";

const sub = new Fish("temurin", ["adoptium", "adoptium-jdk", "temurin-jdk"]);

sub.getUrl = async function(query: Query) {
    const json = (await axios.get(`https://api.adoptium.net/v3/assets/latest/${notNull(query.version, "8")}/hotspot?os=windows`)).data;
    if (json == "") {
        throw new Error("Invalid version");
    }
    let url: string;

    if (query.type == "zip") {
        url = json[1]["binary"]["package"]["link"];
    } else {
        url = json[1]["binary"]["installer"]["link"];
    }

    let githubSource: string | undefined;


    if (env.enableProxy && query.source == "proxy") {
        githubSource = "github";
    } else {
        githubSource = query.source;
    }


    if (query.source === "tsinghua") {
        url = "https://mirrors.tuna.tsinghua.edu.cn/Adoptium/" + query.version + "/jdk/x64/windows/" + path.parse(url).name + (query.type === "zip" ? ".zip" : ".msi");
    } else if (query.source != null) {
        url = github(url, githubSource);
    }

    if (env.enableProxy) {
        if (query.source == "proxy") {
            return getProxyUrl(url);
        }
    }

    return url;
};

sub.getVersion = async function(query) {
    const url = await this.getUrl(query);
    const parse1 = url.split("hotspot_");
    return parse1[parse1.length - 1].slice(0, -4);
};

sub.sources["github"] = new SourceTag("GitHub", {
        official: true
    }
);

addGithubTag(sub.sources);

if (env.enableProxy) {
    sub.sources["proxy"] = new SourceTag("本站代理", {});
}

bucket.add(sub);