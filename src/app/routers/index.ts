import router from "../router";
import { readFileSync } from "fs";

router.on("/", async function(data, response) {
    response.contentType = "text/html";
    response.response = readFileSync(process.cwd() + "/src/public/index.html");
})
