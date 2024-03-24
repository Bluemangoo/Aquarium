import bucket from "../software/bucket";
import getLastModify from "./getLastModify";

const urlBase = "https://aquarium.bluemangoo.net";

export default function sitemap() {
    let xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
        "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
    // index
    xml += `<url><loc>${urlBase}</loc><priority>0.8</priority></url>`;

    // settings
    xml += `<url><loc>${urlBase}/settings</loc><priority>0.1</priority></url>`;

    // search
    xml += `<url><loc>${urlBase}/search</loc><priority>0.3</priority></url>`;

    //fishes
    for (const fish of bucket.fishesList) {
        const lastModify = new Date(Math.max(
            getLastModify(`src/software/subapp/${fish.id}.ts`).valueOf(),
            getLastModify(`src/software/meta/${fish.id}.json`).valueOf(),
            getLastModify(`src/software/body/${fish.id}.md`).valueOf()
        ));
        xml += `<url><loc>${urlBase}/fish/${fish.id}</loc><lastmod>${lastModify.toISOString()}</lastmod></url>`;
    }

    xml += "</urlset>";
    return xml;
}