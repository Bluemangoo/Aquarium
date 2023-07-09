import router from "../router";
// import { readFileSync } from "fs";
import bucket from "../bucket";

router.on("/", async function(data, response) {
    response.response=await bucket.get("adoptium").getUrl({})
})
