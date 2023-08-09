import { Fish } from "../../types/fish";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";

const sub = new Fish("edge", ["microsoft-edge", "microsoftedge"]);

sub.getUrl = async function(query) {
    return "https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&source=EdgeStablePage&Channel=Stable&language=zh-cn";
};

sub.sources["microsoft"] = new SourceTag("Microsoft", {
    official: true,
    web: true
});

bucket.add(sub);