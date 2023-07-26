import router from "../router";
import bucket from "../../software/bucket";
import CONTENT_TYPE from "../../enums/CONTENT_TYPE";
import renderer from "../renderer";

router.pattern(/\/fish\/[a-z0-9]+\//, async function(data, response) {
    response.contentType = CONTENT_TYPE.HTML;
    const name = data.url.split("/")[1];
    let fish = bucket.fishes?.[name];
    if (fish == null) {
        fish = bucket.get(name);
        if (fish == null) {
            response.response = renderer._404();
            return
        }
        response.response=renderer.redirect(`/fish/${fish.id}/`)
        return
    }
    response.response=renderer.detail(fish)
});