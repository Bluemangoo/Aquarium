function s<T>(d: T, i?: T): T {
    if (i == null) {
        return d;
    }
    return i;
}

export class SourceTag {
    constructor(sourceTag: SourceTagI) {
        this.official = s(this.official, sourceTag.official);
        this.slow = s(this.slow, sourceTag.slow);
        this.web = s(this.web, sourceTag.web);
    }

    official: boolean = false;
    slow: boolean = false;
    web: boolean = false;
}

interface SourceTagI {
    official?: boolean;
    slow?: boolean;
    web?: boolean;
}