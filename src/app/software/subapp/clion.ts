import { Fish } from "../../../types/fish";
import Jetbrains from "../../../utils/jetbrains";

const sub = new Fish("clion");

const clion = new Jetbrains("CL");

sub.getUrl = function(query) {
    return clion.getUrl(query);
};

sub.getVersion = function(query) {
    return clion.getVersion(query);
};