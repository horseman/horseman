import * as modalActions from "../modal";

describe("modal", () => {
  test("openModal", () => {
    expect(
      modalActions.openModal("foo", {
        bar: "biz",
      }),
    ).toEqual({
      type: "@@horseman/showModal",
      modalType: "foo",
      props: {
        bar: "biz",
      },
    });
  });
  test("hideModal", () => {
    expect(modalActions.hideModal()).toEqual({
      type: "@@horseman/hideModal",
    });
  });
});
