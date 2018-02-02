import { Headers } from "node-fetch";
import headersToObject from "../headersToObject";

describe("headersToObject", () => {
  test("works", () => {
    const headers = new Headers({
      foo: "bar",
      biz: "baz",
    });
    expect(headersToObject(headers)).toEqual({
      foo: "bar",
      biz: "baz",
    });
  });
  test("works with empty headers", () => {
    const headers = new Headers();
    expect(headersToObject(headers)).toEqual({});
  });
});
