import ejs = require("ejs");
import { Fish } from "../types/fish";
import * as fs from "fs";
import bucket from "../software/bucket";

class Renderer {
    detail(fish: Fish, template: string = "/src/app/layout/fish.ejs") {
        return ejs.render(fs.readFileSync(process.cwd() + template).toString(), { fish });
    }

    index(template: string = "/src/app/layout/index.ejs") {
        return ejs.render(fs.readFileSync(process.cwd() + template).toString(), { bucket });
    }

    redirect(to: string, template: string = "/src/app/layout/redirect.ejs") {
        return ejs.render(fs.readFileSync(process.cwd() + template).toString(), { to });
    }

    _404(template: string = "/src/app/layout/404.ejs") {
        return ejs.render(fs.readFileSync(process.cwd() + template).toString(), {});
    }
}

const renderer = new Renderer();
export default renderer;