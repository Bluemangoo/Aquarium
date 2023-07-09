import * as fs from "fs";
import { GetUrl, GetVersion} from "../types/resolver";

type Meta = {
    name: string,
    icon: string,
    iconDark: string,
    description: string
}

export class Fish {
    public constructor(id: string, alias: string[] = []) {
        this.id = id;
        this.alias = alias;
    }


    private get meta(): Meta {
        if (this._meta == undefined) {
            this._meta = JSON.parse(fs.readFileSync(`${process.cwd()}/src/app/software/meta/${this.id}.json`).toString());
            const meta = <Meta>this._meta;
            if (meta.name == undefined) {
                meta.name = this.id;
            }
            if (meta.icon == undefined) {
                meta.icon = "/static/default-icon.jpg";
            }
            if (meta.iconDark == undefined) {
                meta.iconDark = "/static/default-icon.jpg";
            }
            if (meta.description == undefined) {
                meta.icon = "No description";
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

    get description(): string {
        return this.meta.description;
    }

    get body(): string {
        if (this._body == undefined) {
            this._body = fs.readFileSync(`${process.cwd()}/src/app/software/body/${this.id}.md`).toString();
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