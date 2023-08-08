import router from "../router";
import CONTENT_TYPE from "../../enums/CONTENT_TYPE";
import * as fs from "fs";

router.on("/js/main.js", async function (_data, response) {
    response.contentType = CONTENT_TYPE.JS;
    response.response = fs.readFileSync(process.cwd() + "/js/main.js").toString();
});
