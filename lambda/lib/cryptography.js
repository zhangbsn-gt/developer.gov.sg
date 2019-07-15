const crypto = require("crypto");

const ivLength = 16; // For AES, this is always 16
const algorithm = "aes-256-cbc";

class Cryptography {
    constructor(encryptionKey) {
        if (encryptionKey.length !== 32) {
            // AES256: must be 256 bits (32 characters)
            throw new Error(
                "Cannot initialize cryptography functions. Encryption key length must be 32."
            );
        }
        this.encryptionKey = encryptionKey;
    }

    encrypt(text) {
        let iv = crypto.randomBytes(ivLength);
        let cipher = crypto.createCipheriv(
            algorithm,
            Buffer.from(this.encryptionKey),
            iv
        );
        let encrypted = cipher.update(text);

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString("hex") + ":" + encrypted.toString("hex");
    }

    decrypt(text) {
        let textParts = text.split(":");
        let iv = Buffer.from(textParts.shift(), "hex");
        let encryptedText = Buffer.from(textParts.join(":"), "hex");
        let decipher = crypto.createDecipheriv(
            algorithm,
            Buffer.from(this.encryptionKey),
            iv
        );
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
}

module.exports = Cryptography;
