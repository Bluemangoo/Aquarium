import router from "../router";

router.on("/favicon.ico", async function(_data, response) {
    response.status = 302;
    response.redirect = true;
    response.redirectUrl = "/static/img/light/aquarium.svg";
});
