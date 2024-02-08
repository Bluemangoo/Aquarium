import { Fish } from "../../types/fish";
import Jetbrains from "../../utils/jetbrains";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";

const sub = new Fish("webstorm", ["WS"]);

const webstorm = new Jetbrains("WS");

sub.getUrl = function(query) {
    return webstorm.getUrl(query);
};

sub.getVersion = function(query) {
    return webstorm.getVersion(query);
};

sub.sources["jetbrains"] = new SourceTag("Jetbrains", {
    official: true
});

bucket.add(sub);
