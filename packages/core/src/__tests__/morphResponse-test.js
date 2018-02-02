import { Headers } from "node-fetch";

import morphResponse from "../morphResponse";

describe("morphResponse", () => {
  test("works", () => {
    const mockResponse = {
      status: 300,
      headers: new Headers({
        foo: "bar",
        biz: "baz",
      }),
    };
    expect(morphResponse(mockResponse)).toEqual({
      status: 300,
      headers: {
        foo: "bar",
        biz: "baz",
      },
    });
  });
});
