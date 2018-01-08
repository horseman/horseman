import getRoutePreloadData from "../getRoutePreloadData";

describe("getRoutePreloadData", () => {
  const routes = [
    {
      props: {
        path: "/foo",
        exact: true,
        data: "matchedUrl",
      },
    },
    {
      props: {
        path: "/biz",
        exact: true,
      },
    },
    {
      props: {
        path: "/bar/:id",
        data: "matchedUrl",
      },
    },
  ];

  const wildCardRoutes = [
    {
      props: {
        path: "/*",
        data: "genericUrl",
      },
    },
  ];
  test("should find the correct path", () => {
    expect(getRoutePreloadData(routes, "/foo")).toEqual("matchedUrl");
  });
  test("should not return a matched route without data", () => {
    expect(getRoutePreloadData(routes, "/biz")).toEqual(null);
  });
  test("should match routes with paths", () => {
    expect(getRoutePreloadData(routes, "/bar/test")).toEqual("matchedUrl");
  });
  test("should handle wildcard routes", () => {
    expect(getRoutePreloadData(wildCardRoutes, "/generic")).toEqual(
      "genericUrl",
    );
  });
});
