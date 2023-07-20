import { Fish } from "../../../types/fish";
import bucket from "../../bucket";
import { Query } from "../../../types/resolver";
import axios from "axios";
import notNull from "../../../utils/notNull";
import * as path from "path";
import github from "../../../utils/github";

const sub = new Fish("temurin", ["adoptium", "adoptium-jdk", "temurin-jdk"]);

sub.getUrl = async function(query: Query) {
    const json = (await axios.get(`https://api.adoptium.net/v3/assets/latest/${notNull(query.version, "8")}/hotspot?os=windows`)).data;
    if (json == "") {
        throw new Error("Invalid version");
    }
    let result: string;

    if (query.type == "zip") {
        result = json[1]["binary"]["package"]["link"];
    } else {
        result = json[1]["binary"]["installer"]["link"];
    }


    if (query.from === "tsinghua") {
        result = "https://mirrors.tuna.tsinghua.edu.cn/Adoptium/" + query.version + "/jdk/x64/windows/" + path.parse(result).name + (query.type === "zip" ? ".zip" : ".msi");
    } else if (query.from != null) {
        result = github(result, query.from);
    }

    return result;
};

sub.getVersion = async function(query) {
    const url = await this.getUrl(query);
    const parse1 = url.split("hotspot_");
    return parse1[parse1.length-1].slice(0,-4);
};

bucket.add(sub);