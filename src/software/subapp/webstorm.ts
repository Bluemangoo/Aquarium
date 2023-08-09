import { Fish } from "../../types/fish";
import Jetbrains from "../../utils/jetbrains";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";

const sub = new Fish("webstorm", ["WS"]);

const clion = new Jetbrains("CL");

sub.getUrl = function(query) {
    return clion.getUrl(query);
};

sub.getVersion = function(query) {
    return clion.getVersion(query);
};

sub.sources["jetbrains"] = new SourceTag("Jetbrains", {
    official: true
});

bucket.add(sub);