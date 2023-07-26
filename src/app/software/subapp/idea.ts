import { Fish } from "../../../types/fish";
import Jetbrains from "../../../utils/jetbrains";
import bucket from "../../bucket";

const sub = new Fish("idea",["ideau","intellij","intellij-idea","intellijidea"]);

const clion = new Jetbrains("IIU");

sub.getUrl = function(query) {
    return clion.getUrl(query);
};

sub.getVersion = function(query) {
    return clion.getVersion(query);
};

bucket.add(sub);