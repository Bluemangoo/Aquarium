import router from "../router";
import CONTENT_TYPE from "../../enums/CONTENT_TYPE";
import renderer from "../renderer";
import checkPrebuildFileOr from "../../utils/checkPrebuildFile";

router.on("/search/", async function(data, response) {
    response.contentType = CONTENT_TYPE.HTML;
    response.response = checkPrebuildFileOr("dist/search/index.html", renderer.search);
});
