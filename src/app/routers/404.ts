import router from "../router";
import CONTENT_TYPE from "../../enums/CONTENT_TYPE";
import renderer from "../renderer";
import checkPrebuildFileOr from "../../utils/checkPrebuildFile";

router.on("/404/", async function(_data, response) {
    response.contentType = CONTENT_TYPE.HTML;
    response.response = checkPrebuildFileOr("dist/404.html", renderer._404);
});
