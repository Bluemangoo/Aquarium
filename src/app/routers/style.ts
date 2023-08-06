import router from "../router";
import CONTENT_TYPE from "../../enums/CONTENT_TYPE";
import * as fs from "fs";

router.on("/css/main.css", async function (data, response) {
    response.contentType = CONTENT_TYPE.CSS;
    response.response = fs.readFileSync(process.cwd() + "/dist/css/main.css").toString();
});
