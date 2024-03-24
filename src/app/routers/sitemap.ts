import router from "../router";
import CONTENT_TYPE from "../../enums/CONTENT_TYPE";
import renderer from "../renderer";
import checkPrebuildFileOr from "../../utils/checkPrebuildFile";
import sitemap from "../../utils/sitemap";

router.on("/sitemap.xml", async function(_data, response) {
    response.contentType = CONTENT_TYPE.XML;
    response.response = checkPrebuildFileOr("dist/sitemap.xml", sitemap);
});
