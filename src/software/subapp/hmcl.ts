import { Fish } from "../../types/fish";
import bucket from "../bucket";
import FileCacher from "../../types/fileCacher";
import { SourceTag } from "../../types/sourceTag";

const sub = new Fish("hmcl", ["hello-minecraft-launcher", "hellominecraftlauncher"]);

const d = new FileCacher("https://hmcl.huangyuhui.net/api/update_link?channel=stable&download_link=true");

sub.getUrl = function(query) {
    if (query.type == "jar") {
        return d.data.then(v => v["jar"]);
    }
    return d.data.then(v => v["exe"]);
};

sub.getVersion = function(query) {
    return d.data.then(v => v["version"]);
};

sub.sources["Aliyun"] = new SourceTag({
    official: true
});

bucket.add(sub);