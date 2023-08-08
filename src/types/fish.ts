import * as fs from "fs";
import { GetUrl, GetVersion } from "./resolver";

type Meta = {
    name: string;
    icon: string;
    iconDark: string;
    hasIconDark: boolean;
    description: string;
    site: string;
    tags: string[];
}

export class Fish {
    public constructor(id: string, alias: string[] = []) {
        this.id = id;
        this.alias = alias;
    }


    private get meta(): Meta {
        if (this._meta == undefined) {
            this._meta = JSON.parse(fs.readFileSync(`${process.cwd()}/src/software/meta/${this.id}.json`).toString());
            const meta = <Meta>this._meta;
            if (meta.name == undefined) {
                meta.name = this.id;
            }
            if (meta.icon == undefined) {
                meta.icon = "/static/icon/default-icon.png";
            }
            meta.hasIconDark = true;
            if (meta.iconDark == undefined) {
                meta.hasIconDark = false;
                meta.iconDark = "/static/icon/default-icon.png";
            }
            if (meta.description == undefined) {
                meta.icon = "No description";
            }
            if (meta.site == undefined) {
                meta.site = "./";
            }
            if (meta.tags == undefined) {
                meta.tags = [];
            }
        }
        return <Meta>this._meta;
    }

    get name(): string {
        return this.meta.name;
    }

    get icon(): string {
        return this.meta.icon;
    }

    get iconDark(): string {
        return this.meta.iconDark;
    }

    get hasIconDark(): boolean {
        return this.meta.hasIconDark;
    }

    get description(): string {
        return this.meta.description;
    }

    get site(): string {
        return this.meta.site;
    }

    get tags(): string[] {
        return this.meta.tags;
    }

    get body(): string {
        if (this._body == undefined) {
            this._body = require("markdown-it")({
                html: true,
                linkify: true,
                typographer: true
            }).render(
                fs.readFileSync(`${process.cwd()}/src/software/body/${this.id}.md`).toString()
            );
        }
        return <string>this._body;
    }

    getVersion: GetVersion = async () => "Not support";
    getUrl: GetUrl = async () => "";

    readonly id: string;
    private _meta: Meta | undefined;
    private _body: string | undefined;
    readonly alias: string[];

}