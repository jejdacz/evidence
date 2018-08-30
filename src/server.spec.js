import http from "http";
import { expect, should, assert } from "chai";

describe("Server connection test", () => {
  it("should return 200", done => {
    http.get("http://localhost:8080", res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});