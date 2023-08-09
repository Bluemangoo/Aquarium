import { Fish } from "../../types/fish";
import FileCacher from "../../types/fileCacher";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";

const sub = new Fish("dingtalk", ["dingding", "ding-ding"]);

const d = new FileCacher("https://im.dingtalk.com/manifest/new/website/vista_later.json");

sub.getUrl = function(_query) {
    return d.data.then(v => v["win"]["install"]["url"]);
};

sub.getVersion = function(_query) {
    return d.data.then(v => v["win"]["package"]["version"]);
};

sub.sources["Aliyun"] = new SourceTag({
    official: true
});

bucket.add(sub);