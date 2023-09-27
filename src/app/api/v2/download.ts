import apiRouter from "../../apiRouter";
import bucket from "../../../software/bucket";

apiRouter.fishApi("/download/", async function(request, response) {
    const fish = bucket.get(request.fish);
    if (fish == null) {
        apiRouter._404(request, response);
    } else {
        response.status = 302;
        response.redirectUrl = await fish.getUrl(request.query);
        response.redirect = true;
    }
});