import ejs = require("ejs");
import { Fish } from "../types/fish";
import * as fs from "fs";
import bucket from "../software/bucket";

class Renderer {
    detail(fish: Fish, template: string = "/src/app/layout/fish.ejs") {
        return ejs.render(
            fs.readFileSync(process.cwd() + template).toString(),
            {
                page: {
                    title: `${fish.name} - Aquarium`,
                    keywords: fish.tags.join(","),
                    description: fish.description,
                    type: "detail"
                },
                navbar: {
                    search: true
                },
                data: {
                    fish
                }
            },
            {
                filename: process.cwd() + template
            }
        );
    }

    index(template: string = "/src/app/layout/index.ejs") {
        return ejs.render(
            fs.readFileSync(process.cwd() + template).toString(),
            {
                page: {
                    title: `Aquarium`,
                    keywords: "",
                    description: "Aquarium是一个软件收集站点。它提供了安全、直接的下载链接，详细的软件信息和用户友好的搜索功能。作为一个开源项目，Aquarium欢迎任何人的参与和贡献，一同为用户提供最优质的下载体验。",
                    type: "index"
                },
                navbar: {
                    search: true
                },
                data: {
                    bucket
                }
            },
            {
                filename: process.cwd() + template
            }
        );
    }

    settings(template: string = "/src/app/layout/settings.ejs") {
        return ejs.render(
            fs.readFileSync(process.cwd() + template).toString(),
            {
                page: {
                    title: `设置 - Aquarium`,
                    keywords: "",
                    description: "",
                    type: "settings"
                },
                navbar: {
                    search: true
                },
                data: {}
            },
            {
                filename: process.cwd() + template
            }
        );
    }

    search(template: string = "/src/app/layout/search.ejs") {
        return ejs.render(
            fs.readFileSync(process.cwd() + template).toString(),
            {
                page: {
                    title: `搜索 - Aquarium`,
                    keywords: "",
                    description: "",
                    type: "search"
                },
                navbar: {
                    search: false
                },
                data: {}
            },
            {
                filename: process.cwd() + template
            }
        );
    }

    _404(template: string = "/src/app/layout/404.ejs") {
        return ejs.render(
            fs.readFileSync(process.cwd() + template).toString(),
            {
                page: {
                    title: `404 - Aquarium`,
                    keywords: "",
                    description: "404 Error",
                    type: "404"
                },
                navbar: {
                    search: true
                },
                data: {}
            },
            {
                filename: process.cwd() + template
            }
        );
    }
}

const renderer = new Renderer();
export default renderer;
