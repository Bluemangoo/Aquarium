import router from "../router";
import CONTENT_TYPE from "../../enums/CONTENT_TYPE";
import renderer from "../renderer";
import checkPrebuildFileOr from "../../utils/checkPrebuildFile";

router.on("/settings/", async function(data, response) {
    response.contentType = CONTENT_TYPE.HTML;
    response.response = checkPrebuildFileOr("dist/settings/index.html", renderer.settings);
});
