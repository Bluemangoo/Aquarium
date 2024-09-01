import { Fish } from "../../types/fish";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";

const sub = new Fish("cloud-music", ["cloudmusic", "wangyiyunyinyue"]);

sub.getUrl = async function(query) {
    return "https://music.163.com/api/pc/package/download/latest";
};

sub.sources["netease"] = new SourceTag("网易", {
    official: true
});

bucket.add(sub);
