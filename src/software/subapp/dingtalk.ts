import { Fish } from "../../types/fish";
import FileCacher from "../../types/FileCacher";
import bucket from "../bucket";

const sub = new Fish("dingtalk", ["dingding", "ding-ding"]);

const d = new FileCacher("https://im.dingtalk.com/manifest/new/website/vista_later.json");

sub.getUrl = function(query) {
    return d.data.then(v => v["win"]["install"]["url"]);
};

sub.getVersion = function(query) {
    return d.data.then(v => v["win"]["package"]["version"]);
};

bucket.add(sub);