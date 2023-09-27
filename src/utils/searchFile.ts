import bucket from "../software/bucket";

type Summary = {
    id: string,
    name: string,
    description: string,
    tags: string[],
    content: string
}

export default function searchFile() {
    let result: Summary[] = [];
    for (const fish of bucket.fishesList) {
        let s: Summary = {
            id: fish.id,
            name: fish.name,
            description: fish.description,
            tags: fish.tags
                .map(item => item.toLowerCase()),
            content: fish.body
                .replace(/<[^>]+>/g, "")
                .replace(/\n/g, "")
                .toLowerCase()
        };
        result.push(s);
    }
    return result;
}