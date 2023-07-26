import VCLight, { Plugin, Response } from "vclight";
import { VercelRequest } from "@vercel/node";
import { ServerResponse } from "http";

class KeepFile implements Plugin {
    async init(request: VercelRequest, app: VCLight): Promise<void> {
    }

    async process(request: VercelRequest, response: ServerResponse, responseContent: Response, app: VCLight): Promise<void> {
        if (require.main === module) {
            require("../prebuild/keep");
        }
    }

}

const keepFile = new KeepFile();

export default keepFile;