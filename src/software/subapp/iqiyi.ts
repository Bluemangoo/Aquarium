import { Fish } from "../../types/fish";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";

const sub = new Fish("iqiyi");

sub.getUrl = async function(query) {
    return "https://dl-static.iqiyi.com/hz/IQIYIsetup_z40.exe";
};

sub.sources["Iqiyi"] = new SourceTag({
    official: true
});

bucket.add(sub);