import { Fish } from "../../types/fish";
import Jetbrains from "../../utils/jetbrains";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";
import env from "../../utils/env";
import getProxyUrl from "../../utils/getProxyUrl";

const sub = new Fish("pycharm", ["pycharmp"]);

const pycharm = new Jetbrains("PCP");

sub.getUrl = async function(query) {
    const url = await pycharm.getUrl(query);
    if (env.enableProxy) {
        if (query.source == "proxy") {
            return getProxyUrl(url);
        }
    }
    return url;
};

sub.getVersion = function(query) {
    return pycharm.getVersion(query);
};

sub.sources["jetbrains"] = new SourceTag("Jetbrains", {
    official: true
});

if (env.enableProxy) {
    sub.sources["proxy"] = new SourceTag("本站代理", {});
}

bucket.add(sub);