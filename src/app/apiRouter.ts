import VCLightRouter, { RequestContext, ResponseContext } from "vclight-router";
import CONTENT_TYPE from "../static/const/CONTENT_TYPE";
import { ServerResponse } from "http";
import { VercelRequest } from "@vercel/node";
import VCLight, { Response } from "vclight";

export type ApiRequestContext = RequestContext & {
    fish: string
}

class ApiRouter extends VCLightRouter {
    constructor() {
        super({
            buildInRouters: {
                _404: false
            }
        });
    }

    /**
     * @deprecated
     * @param event
     * @param fn
     */
    public on(event: string, fn: (data: RequestContext, response: ResponseContext) => void) {
    }

    /**
     * @deprecated
     * @param pattern
     * @param fn
     */
    public pattern(pattern: RegExp, fn: (data: RequestContext, response: ResponseContext) => void) {
    }

    public api(event: string, fn: (data: ApiRequestContext, response: ResponseContext) => void) {
        if (this.events[event]) {
            console.warn(`Warning: event ${event} have been redefined`);
        }
        this.events[event] = fn;
    }

    protected events: {
        [key: string]: any;
    } = [];

    _404(data: RequestContext, response: ResponseContext) {
        response.response = {
            code: 404,
            msg: `${data.url} is not found`
        };
        response.contentType = CONTENT_TYPE.JSON;
    }


    _500(data: RequestContext, response: ResponseContext) {
        response.response = {
            code: 500,
            msg: `An error was occurred`
        };
        response.contentType = CONTENT_TYPE.JSON;
    }

    public get(event: string): (data: RequestContext, response: ResponseContext) => void {
        if (this.events?.[event]) {
            return this.events?.[event];
        }

        if (event[event.length - 1] !== "/" && this.events?.[(event + "/")]) {
            return this.events?.[(event + "/")];
        }

        return this._404;
    }


    async process(request: VercelRequest, response: ServerResponse, responseContent: Response, app: VCLight): Promise<void> {
        if (this.broken) {
            return;
        }

        //finding process function
        const parsedUrl = new URL(`https://foo.bar${request.url}`);
        let splitUrl = parsedUrl.pathname.split("/");
        let fn: (data: ApiRequestContext, response: ResponseContext) => void;
        if (splitUrl.length < 4) {
            fn = this._404;
        } else {
            fn = this.get("/" + splitUrl.slice(4).join("/") + "/");
        }

        //prepare request data
        const requestContext: ApiRequestContext = {
            url: parsedUrl.pathname,
            query: request.query,
            body: (() => {
                try {
                    return request.body;
                } catch {
                    return null;
                }
            })(),
            cookies: request.cookies,
            method: <string>request.method,
            fish: splitUrl[3]
        };
        const responseContext = new ResponseContext(responseContent);
        responseContext.contentType = CONTENT_TYPE.JSON;

        //processing
        try {
            await fn(requestContext, responseContext);
        } catch {
            this._500(requestContext, responseContext);
        }

        //process response
        responseContent.load(responseContext);
        if (responseContent.redirect) {
            return;
        }

        if (responseContext.contentType) {
            response.setHeader("content-type", responseContext.contentType);
        }
    }


}

const apiRouter = new ApiRouter();

export default apiRouter;

import "./routers/api"