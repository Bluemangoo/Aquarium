const crypto = require("crypto");

// 生成RSA密钥对并以Base64编码形式返回
function generateRSAKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048, // 密钥长度
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem"
        }
    });

    return {
        publicKey: publicKey,
        privateKey: privateKey
    };
}

const k = generateRSAKeyPair();
console.log("pub:");
console.log(k.publicKey);
console.log("pri:");
console.log(k.privateKey);
