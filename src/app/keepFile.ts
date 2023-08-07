import VCLight, { VCLightMiddleware, VCLightResponse } from "vclight";
import { VercelRequest } from "@vercel/node";
import { ServerResponse } from "http";

class KeepFile implements VCLightMiddleware {
    async init(_request: VercelRequest, _app: VCLight): Promise<void> {
    }

    async process(_request: VercelRequest, _response: ServerResponse, _responseContent: VCLightResponse, _app: VCLight): Promise<void> {
        if (require.main === module) {
            require("../prebuild/keep");
        }
    }

}

const keepFile = new KeepFile();

export default keepFile;