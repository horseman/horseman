/* eslint-disable import/no-unresolved, import/extensions, no-underscore-dangle */
import Horseman, { ActionFactory } from "@horseman/core";
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

  describe("fetching single menu", () => {
    test("fetchMenu", () => {
      menusActions.fetchMenu("foo");

      expect(ActionFactory.mock.calls[0][0]).toEqual(
        "@@horseman/addRemoteMenu",
      );
      expect(ActionFactory.__getInner().mock.calls[0][0]).toEqual("foo");

      const bypassFunction = ActionFactory.mock.calls[0][1];
      expect(bypassFunction()).toEqual(false);
    });

    test("bypass when existing", () => {
      Horseman.addResource({
        action: "#",
        endpoint: "foo",
      });

      menusActions.fetchMenu("foo");
      const bypassFunction = ActionFactory.mock.calls[1][1];
      expect(bypassFunction()).toEqual(true);
    });
  });

  test("fetchMenuSet", () => {
    menusActions.fetchMenuSet("foo");

    expect(ActionFactory.mock.calls[2][0]).toEqual(
      "@@horseman/addRemoteMenuSet",
    );
    expect(ActionFactory.__getInner().mock.calls[2][0]).toEqual("foo");
  });

  test("fetchWPMenu", () => {
    menusActions.fetchWPMenu("wpMenu");

    expect(ActionFactory.mock.calls[3][0]).toEqual(
      "@@horseman/addRemoteWPMenu",
    );
    expect(ActionFactory.__getInner().mock.calls[3][0]).toEqual("wpMenu");

    const bypassFunction = ActionFactory.mock.calls[3][1];
    expect(bypassFunction()).toEqual(false);
  });
});
