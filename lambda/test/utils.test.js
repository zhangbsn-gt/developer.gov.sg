const assert = require("assert");
const utils = require("../lib/utils");

describe("Utils tests", function() {
    it("can test if first array contains second array", function() {
        let firstArray = ["term", "my-term", "another-term"];
        let secondArray = ["term", "my-term"];
        assert.strictEqual(
            utils.firstArrayContainsSecondArray(firstArray, secondArray),
            true
        );
    });
    it("will fail if first array doesn't contain second array", function() {
        let firstArray = ["term", "my-term"];
        let secondArray = ["term", "another-term"];
        assert.strictEqual(
            utils.firstArrayContainsSecondArray(firstArray, secondArray),
            false
        );
    });
    it("will return true if both arrays are empty", function() {
        let firstArray = [];
        let secondArray = [];
        assert.strictEqual(
            utils.firstArrayContainsSecondArray(firstArray, secondArray),
            true
        );
    });
});
