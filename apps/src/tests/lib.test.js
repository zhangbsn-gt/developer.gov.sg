import assert from "assert";
import { hasErrors } from "../lib";

describe("lib tests", function() {
  describe("hasErrors", function() {
    it("returns false for an empty errors object", function() {
      let hasError = hasErrors({ title: "", description: "", another: null });
      assert.strictEqual(hasError, false);
      let hasError1 = hasErrors({});
      assert.strictEqual(hasError1, false);
    });
    it("returns true for non-empty errors object", function() {
      let hasError = hasErrors({ title: 123, description: null, another: "" });
      assert.strictEqual(hasError, true);
    });
  });
});
