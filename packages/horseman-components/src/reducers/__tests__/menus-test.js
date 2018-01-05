import menus from "../menus";

describe("menus reducer", () => {
  const state = {
    main: [
      {
        to: "#",
        text: "Foo",
        open: false,
      },
    ],
    secondary: [
      {
        to: "#",
        text: "Foo",
        open: true,
      },
    ],
  };
  test("default state", () => {
    expect(menus(undefined, { type: "foo" })).toEqual({});
  });
  test("unknown action", () => {
    expect(menus({ foo: "bar" }, { type: "foo" })).toEqual({ foo: "bar" });
  });

  test("toggleMenuItem", () => {
    expect(
      menus(state, {
        type: "@@horseman/toggleMenuItem",
        menuName: "main",
        itemTitle: "Foo",
      }),
    ).toEqual({
      ...state,
      main: [
        {
          ...state.main[0],
          open: true,
        },
      ],
    });
  });

  test("closeMenu", () => {
    expect(
      menus(state, {
        type: "@@horseman/closeMenu",
        menuName: "secondary",
      }),
    ).toEqual({
      ...state,
      secondary: [
        {
          ...state.secondary[0],
          open: false,
        },
      ],
    });
  });

  test("addMenu", () => {
    const newMenu = [
      {
        to: "#",
        text: "Bar",
        subnav: [
          {
            to: "biz",
            text: "baz",
          },
        ],
      },
    ];
    expect(
      menus(state, {
        type: "@@horseman/addMenu",
        menuName: "alternate",
        menu: newMenu,
      }),
    ).toEqual({
      ...state,
      alternate: newMenu,
    });
  });

  test("addRemoteMenu", () => {
    const newMenu = [
      {
        to: "#",
        text: "Bar",
        subnav: [
          {
            to: "biz",
            text: "baz",
          },
        ],
      },
    ];
    expect(
      menus(state, {
        type: "@@horseman/addRemoteMenu",
        payload: {
          slug: "alternate",
          menuItems: newMenu,
        },
      }),
    ).toEqual({
      ...state,
      alternate: newMenu,
    });
  });
});
