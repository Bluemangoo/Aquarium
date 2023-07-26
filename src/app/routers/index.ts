import router from "../router";
// import { readFileSync } from "fs";
import bucket from "../../software/bucket";
import CONTENT_TYPE from "../../enums/CONTENT_TYPE";
import renderer from "../renderer";

router.on("/", async function(data, response) {
    response.contentType = CONTENT_TYPE.HTML;
    response.response = renderer.index();
});
