// noinspection SpellCheckingInspection

export default function github(origin: string, from?: string): string {
    switch (from) {
        case "github":
            return origin;
        case "91chi":
            return "https://github.91chi.fun/" + origin;
        case "yanqishui":
            return "https://gh2.yanqishui.work/" + origin;
        case "ghproxy":
            return "https://gxproxy.com/" + origin;
        case "ghproxymirror":
            return "https://mirror.gxproxy.com/" + origin;
        case "fastgit":
            const path = require("url").parse(origin).path.toString();
            const type = path.split(/\//g)[3];
            if (type === "releases") {
                return "https://download.fastgit.xyz" + path;
            }
            if (type === "archive") {
                return "https://archive.fastgit.xyz" + path;
            }
    }
    return origin;
}