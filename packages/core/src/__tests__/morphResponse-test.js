import { Headers } from "node-fetch";
import { config } from "fetch-mock";

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
  test("works with legacy Headers", () => {
    const mockResponse = {
      status: 300,
      headers: new config.Headers({
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
