import { Fish } from "../../../types/fish";
import bucket from "../../bucket";

const sub = new Fish("iqiyi");

sub.getUrl = async function(query) {
    return "https://dl-static.iqiyi.com/hz/IQIYIsetup_z40.exe";
};

bucket.add(sub);