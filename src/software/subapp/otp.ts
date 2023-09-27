//Warning: this resolver uses regex
import { Fish } from "../../types/fish";
import axios from "axios";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";
import checkInList from "../../utils/checkInList";

const sub = new Fish("otp", ["office-tool-plus"]);

sub.getUrl = async function(query) {
    const source = checkInList(
        query.source,
        "sdumirror",
        ["github", "sdumirror", "yuntu", "onedrive"]
    );

    return `https://otp.landian.vip/redirect/download.php?type=runtime&site=${source}`;

};

sub.getVersion = async function(_query) {
    const data = await axios.get("https://download.coolhub.top/Office_Tool_Plus/Hash.txt");
    const ver = (<string>data.data).match(/(?<=## Version )(\d+\.\d+\.\d+\.\d+)/);
    if (ver == null) {
        throw new Error();
    }
    return ver[0];
};

sub.sources["sdumirror"] = new SourceTag("山东大学镜像站", {
    official: true
});
sub.sources["yuntu"] = new SourceTag("云图小镇", {
    official: true
});
sub.sources["onedrive"] = new SourceTag("OneDrive", {
    official: true
});
sub.sources["github"] = new SourceTag("GitHub", {
    official: true
});

bucket.add(sub);