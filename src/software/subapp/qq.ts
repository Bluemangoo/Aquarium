import { Fish } from "../../types/fish";
import axios from "axios";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";

const sub = new Fish("qq");

sub.getUrl = async function(_query) {
    let data = await axios.get("https://im.qq.com/pcqq");
    const url = (<string>data.data).match(/(?<=<div class="btn-downlond"><a href=").*(?=" class="download">)/);
    if (url == null) {
        throw new Error();
    }
    return url[0];
};

sub.getVersion = async function(_query) {
    let data = await axios.get("https://im.qq.com/pcqq");
    const url = (<string>data.data).match(/(?<=<div class="btn-downlond"><a href=").*(?=" class="download">)/);
    if (url == null) {
        throw new Error();
    }
    return url[0];
};

sub.sources["tencent"] = new SourceTag("腾讯", {
    official: true
});

bucket.add(sub);