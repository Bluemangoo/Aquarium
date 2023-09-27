import VCLightRouter from "vclight-router";

const router = new VCLightRouter({
    buildInRouters: {
        _404: false
    }
});
export default router;

import "./routers/404";
import "./routers/favicon";
import "./routers/fish";
import "./routers/index";
import "./routers/js";
import "./routers/search"
import "./routers/settings";
import "./routers/style";
