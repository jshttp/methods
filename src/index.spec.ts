import { METHODS } from "node:http";
import { assert, describe, it } from "vitest";
import { methods as browserMethods } from "./browser.js";
import { methods } from "./index.js";

describe("methods", function () {
  it("contains Node.js HTTP.METHODS in lowercase and in the same order", function () {
    assert.deepEqual(
      methods,
      METHODS.map((method) => method.toLowerCase()),
    );
  });
});

describe("browser methods", function () {
  it.each(["get", "post", "put", "patch", "delete"])(
    "contains %s",
    function (method) {
      assert.include(browserMethods, method);
    },
  );

  it("contains only lowercase methods", function () {
    for (const method of browserMethods) {
      assert.strictEqual(method, method.toLowerCase());
    }
  });
});
