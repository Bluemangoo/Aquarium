//Warning: this resolver uses regex
import { Fish } from "../../types/fish";
import bucket from "../bucket";
import axios from "axios";
import { SourceTag } from "../../types/sourceTag";

const sub = new Fish("obs", ["obs-studio", "obsstudio"]);

sub.getUrl = async function(query) {
    const page = await axios.get("https://obsproject.com/download");
    return page.data.match(/(?<=<a href=").*(?=" class="green_btn download-welcome" target="_blank" rel="noopener">)/)[0];
};

sub.getVersion = async function(query) {
    const page = await axios.get("https://obsproject.com/download");
    return page.data.match(/(?<=Version: ).*(?=<\/span><span class="dl_date">)/)[0];
};

sub.sources["obs"] = new SourceTag("OBS", {
    official: true
});

bucket.add(sub);