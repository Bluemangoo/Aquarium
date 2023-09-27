import apiRouter from "../../../apiRouter";
import bucket from "../../../../software/bucket";

apiRouter.fishApi("/version/", async function(request, response) {
    const fish = bucket.get(request.fish);
    if (fish == null) {
        apiRouter._404(request, response);
    } else {
        response.response = {
            code: 200,
            fish: fish.name,
            version: await fish.getVersion(request.query)
        };
    }
});