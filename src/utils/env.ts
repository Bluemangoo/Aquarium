class Env {
    proxyUrl = process.env["PROXY_URL"];
    proxyKey = process.env["PROXY_KEY"];
    enableProxy = this.proxyUrl != undefined && this.proxyKey != undefined;
}

const env = new Env();

export default env;