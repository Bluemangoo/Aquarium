import axios from "axios";

export default class FileCacher {

    constructor(url: string) {
        this._url = url;
    }

    get data(): Promise<any> {
        if (this._data == null) {
            this._data = axios.get(this._url)
                .then(v => v.data);
        }
        return this._data;
    }

    private _data: Promise<any> | undefined;
    private readonly _url: string;
}