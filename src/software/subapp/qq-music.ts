import { Fish } from "../../types/fish";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";

const sub = new Fish("qq-music",["qqmusic"]);

sub.getUrl = async function(_query) {
    return "https://dldir1.qq.com/music/clntupate/QQMusicSetup.exe";
};

sub.sources["tencent"] = new SourceTag("腾讯", {
    official: true
});

bucket.add(sub);