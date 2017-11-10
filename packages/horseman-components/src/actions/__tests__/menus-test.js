import * as menusActions from "../menus";

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
});
