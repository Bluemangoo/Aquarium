import env from "./env";
import * as crypto from "crypto";

function encryptWithRSA(message: string, publicKeyBase64: string) {
    const publicKey = Buffer.from(publicKeyBase64, "utf-8");
    const key = {
        key: publicKey,
        format: "pem",
        type: "pkcs1"
    };

    const encrypted = crypto.publicEncrypt(key, Buffer.from(message));
    return encrypted.toString("base64");
}

export default async function getProxyUrl(url: string): Promise<string> {
    const data = JSON.stringify({
        url,
        expires: Date.now() + 1000 * 60 * 10
    });

    const encryptedData = encryptWithRSA(crypto.createHash("sha256").update(data).digest("hex"), <string>env.proxyKey);

    return `${env.proxyUrl}?q=${Buffer.from(data).toString("base64")}&sign=${Buffer.from(encryptedData).toString("base64")}`;
}