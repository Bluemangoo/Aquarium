import { Fish } from "../types/fish";

class Bucket {
    add(software: Fish) {
        this.map[software.id] = software;
        for (const alias of software.alias) {
            this.map[alias] = software;
        }
    }

    get(name: string): Fish {
        return this.map?.[name];
    }

    private map: { [key: string]: Fish } = {};
}

const bucket = new Bucket();
export default bucket;

import "./fishing";