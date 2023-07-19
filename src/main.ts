import VCLight from "vclight";
import router from "./app/router";
import { VercelRequest, VercelResponse } from "@vercel/node";
import apiRouter from "./app/apiRouter";

module.exports = async function(request: VercelRequest, response: VercelResponse) {
    const app = new VCLight();
    if (request.url?.startsWith("/api/v2/")) {
        app.use(apiRouter);
    } else {
        app.use(router);
    }
    await app.fetch(request, response);
};
