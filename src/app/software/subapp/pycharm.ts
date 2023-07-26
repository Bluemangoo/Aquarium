import { Fish } from "../../../types/fish";
import Jetbrains from "../../../utils/jetbrains";
import bucket from "../../bucket";

const sub = new Fish("pycharm",["pycharmp"]);

const clion = new Jetbrains("PCP");

sub.getUrl = function(query) {
    return clion.getUrl(query);
};

sub.getVersion = function(query) {
    return clion.getVersion(query);
};

bucket.add(sub);