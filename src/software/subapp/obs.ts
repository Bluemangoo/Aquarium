//Warning: this resolver uses regex
import { Fish } from "../../types/fish";
import bucket from "../bucket";
import axios from "axios";
import { SourceTag } from "../../types/sourceTag";
import env from "../../utils/env";
import getProxyUrl from "../../utils/getProxyUrl";

const sub = new Fish("obs", ["obs-studio", "obsstudio"]);

sub.getUrl = async function(query) {
    const page = await axios.get("https://obsproject.com/download");
    const url= page.data.match(/(?<=<a href=").*(?=" class="green_btn download-welcome" target="_blank" rel="noopener">)/)[0];
    if (env.enableProxy) {
        if (query.source == "proxy") {
            return getProxyUrl(url);
        }
    }
    return url;
};

sub.getVersion = async function(_query) {
    const page = await axios.get("https://obsproject.com/download");
    return page.data.match(/(?<=Version: ).*(?=<\/span><span class="dl_date">)/)[0];
};

sub.sources["obs"] = new SourceTag("OBS", {
    official: true
});

if (env.enableProxy) {
    sub.sources["proxy"] = new SourceTag("本站代理", {});
}

bucket.add(sub);