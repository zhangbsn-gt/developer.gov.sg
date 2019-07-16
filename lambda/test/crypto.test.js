const assert = require("assert");
const crypto = require("crypto");
const Cryptography = require("../lib/cryptography");

describe("Crypto tests", function() {
    describe("encryption and decryption", function() {
        it("can encrypt and decrypt a string", function() {
            let encryptionKey = crypto.randomBytes(16).toString("hex");
            let c = new Cryptography(encryptionKey);

            let original = "hello there!";
            let cipher = c.encrypt(original);
            let plain = c.decrypt(cipher);

            assert.strictEqual(original, plain);
        });
    });
});
