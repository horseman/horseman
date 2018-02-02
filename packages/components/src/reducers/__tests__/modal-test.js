import modal from "../modal";

describe("modal reducer", () => {
  test("default state", () => {
    expect(modal(undefined, { type: "foo" })).toEqual({
      modalType: null,
      modalProps: {},
    });
  });
  test("unknown action", () => {
    expect(modal({ foo: "bar" }, { type: "foo" })).toEqual({ foo: "bar" });
  });
  test("showModal", () => {
    expect(
      modal(
        { foo: "bar" },
        {
          type: "@@horseman/showModal",
          modalType: "biz",
          props: { fizz: "buzz" },
        },
      ),
    ).toEqual({
      props: {
        fizz: "buzz",
      },
      modalType: "biz",
    });
  });
  test("hideModal", () => {
    expect(
      modal(
        { foo: "bar" },
        {
          type: "@@horseman/hideModal",
        },
      ),
    ).toEqual({
      modalType: null,
      modalProps: {},
    });
  });
});
