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

  test("addRemoteMenuSet", () => {
    const payload = {
      data: [
        {
          slug: "one",
          menuItems: [
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
          ],
        },
        {
          slug: "two",
          menuItems: [
            {
              to: "#bang",
              text: "Bang",
            },
          ],
        },
      ],
    };
    expect(
      menus(state, {
        payload,
        type: "@@horseman/addRemoteMenuSet",
      }),
    ).toEqual({
      ...state,
      one: payload.data[0].menuItems,
      two: payload.data[1].menuItems,
    });
  });

  test("addRemoteWPMenu", () => {
    const data = require("./wpMenu.json");

    expect(
      menus(state, {
        type: "@@horseman/addRemoteWPMenu",
        payload: data,
      }),
    ).toEqual({
      ...state,
      alternate: [
        { text: "Foo", to: "http://foo.com" },
        {
          text: "Bar",
          to: "http://bar.com",
          subnav: [
            { target: "_blank", text: "Child", to: "https://child.com" },
          ],
        },
      ],
    });
  });
});
