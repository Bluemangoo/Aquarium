import { Fish } from "../../types/fish";
import { SourceTag } from "../../types/sourceTag";
import bucket from "../bucket";

const sub = new Fish("kugou", ["ku-gou"]);

sub.getUrl = async function(query) {
    return "https://download.kugou.com/download/kugou_pc";
};

sub.sources["kugou"] = new SourceTag("酷狗", {
    official: true
});

bucket.add(sub);