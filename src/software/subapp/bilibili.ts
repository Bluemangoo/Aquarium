import { Fish } from "../../types/fish";
import axios from "axios";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";

const sub = new Fish("bilibili");

sub.getUrl = async function(query) {
    return "https://dl.hdslb.com/mobile/fixed/bili_win/bili_win-install.exe";
};

sub.getVersion = async function(query) {
    const data = await axios.get("https://app.bilibili.com/x/v2/version?mobi_app=win&cdn_url=pc_electron");
    return data.data["data"][0]["version"];
};

sub.sources["Bilibili"] = new SourceTag({
    official: true
});

bucket.add(sub);