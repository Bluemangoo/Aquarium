import axios from "axios";
import { Query } from "../types/resolver";

export default class Jetbrains {
    constructor(productId: string) {
        this.productId = productId;
    }

    get versions(): Promise<any> {
        if (this._versions == null) {
            this._versions = axios.get(`https://data.services.jetbrains.com/products/releases?code=${this.productId}&latest=true&type=release`).then(v => v.data[this.productId]);
        }
        return this._versions;
    }

    async getUrl(query: Query) {
        const versions = await this.versions;
        if (query.source == "jetbrains-cn") {
            return "https://download.jetbrains.com.cn" + versions[0]["downloads"]["windows"]["link"].slice(30);
        }
        return versions[0]["downloads"]["windows"]["link"];
    }

    async getVersion(query: Query) {
        const versions = await this.versions;
        return versions[0]["version"];
    }

    private readonly productId;
    private _versions: Promise<any> | undefined;
}