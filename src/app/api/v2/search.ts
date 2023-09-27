import apiRouter from "../../apiRouter";
import checkPrebuildFileOr from "../../../utils/checkPrebuildFile";
import searchFile from "../../../utils/searchFile";

apiRouter.on("/search/", function(_data, response) {
    response.response = checkPrebuildFileOr("api/search.json", searchFile);
});