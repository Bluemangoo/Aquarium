import router from "../router";
import bucket from "../../software/bucket";
import CONTENT_TYPE from "../../enums/CONTENT_TYPE";
import renderer from "../renderer";
import checkPrebuildFileOr from "../../utils/checkPrebuildFile";
import { Fish } from "../../types/fish";

router.pattern(/\/fish\/[a-z0-9]+\//, async function(data, response) {
    response.contentType = CONTENT_TYPE.HTML;
    const name = data.url.split("/")[1];
    response.response = checkPrebuildFileOr(`fish/${name}.html`, () => {
        let fish: Fish = bucket.fishes?.[name];
        if (fish == null) {
            fish = bucket.get(name);
            if (fish == null) {
                return checkPrebuildFileOr("404.html", renderer._404);
            }
            response.redirect = true;
            response.status = 302;
            response.redirectUrl = `/fish/${fish.id}/`;
            return "";
        }
        return renderer.detail(fish);
    });
});