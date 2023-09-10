import router from "../router";
import CONTENT_TYPE from "../../enums/CONTENT_TYPE";
import checkPrebuildFileOr from "../../utils/checkPrebuildFile";
import renderer from "../renderer";

router.pattern(/^\/js\/.*/, async function(data, response) {
    if ((<string>data.url).includes("/**/")) {
        response.contentType = CONTENT_TYPE.HTML;
        response.response = checkPrebuildFileOr("dist/404.html", renderer._404);
        return;
    }
    response.contentType = CONTENT_TYPE.JS;
    response.response = checkPrebuildFileOr("dist"+data.url, () =>
        checkPrebuildFileOr("src/app" + data.url,
            () => {
                response.contentType = CONTENT_TYPE.HTML;
                return checkPrebuildFileOr("dist/404.html", renderer._404);
            }
        )
    );
});
