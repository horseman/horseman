import * as HC from "horseman-core";

import * as menusActions from "../menus";

const inner = jest.fn();

const ActionFactory = jest.fn(() => inner);

HC.ActionFactory = ActionFactory;

describe("menus", () => {
  test("toggleMenuItem", () => {
    expect(
      menusActions.toggleMenuItem({
        menuName: "foo",
        itemTitle: "bar",
      }),
    ).toEqual({
      type: "@@horseman/toggleMenuItem",
      menuName: "foo",
      itemTitle: "bar",
    });
  });

  test("closeMenu", () => {
    expect(menusActions.closeMenu("foo")).toEqual({
      type: "@@horseman/closeMenu",
      menuName: "foo",
    });
  });

  test("addMenu", () => {
    expect(
      menusActions.addMenu({
        menuName: "foo",
        menu: [{ to: "#", text: "foo" }],
      }),
    ).toEqual({
      type: "@@horseman/addMenu",
      menuName: "foo",
      menu: [{ to: "#", text: "foo" }],
    });
  });

  test("fetchMenu", () => {
    menusActions.fetchMenu("foo");

    expect(ActionFactory.mock.calls[0][0]).toEqual("@@horseman/addRemoteMenu");
    expect(inner.mock.calls[0][0]).toEqual("foo");
  });
});
