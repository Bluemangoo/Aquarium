import { Fish } from "../../types/fish";
import bucket from "../bucket";

const sub = new Fish("edge", ["microsoft-edge", "microsoftedge"]);

sub.getUrl = async function(query) {
    return "https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&source=EdgeStablePage&Channel=Stable&language=zh-cn";
};

bucket.add(sub);