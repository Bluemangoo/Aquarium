import VCLight from "vclight";
import router from "./app/router";
import { VercelRequest, VercelResponse } from "@vercel/node";

module.exports = async function(request: VercelRequest, response: VercelResponse) {
    const app = new VCLight();
    app.use(router);
    await app.fetch(request, response);
};
