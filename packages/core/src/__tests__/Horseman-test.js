import Horseman from "../Horseman";

describe("Horseman singleton", () => {
  test("constructor", () => {
    expect(Horseman.getAllResources().size).toEqual(0);
  });

  describe("adding & getting resources", () => {
    test("adding", () => {
      const newResource = {
        action: "foo",
        endpoint: "bar",
      };

      Horseman.addResource(newResource);

      expect(Horseman.getAllResources().has(newResource.endpoint)).toEqual(
        true,
      );
    });
    test("getting", () => {
      const newResource = {
        action: "biz",
        endpoint: "baz",
      };
      Horseman.addResource(newResource);
      expect(Horseman.getAllResources().size).toEqual(2);
    });

    test("hasCheck", () => {
      const resource = {
        action: "biz",
        endpoint: "baz",
      };
      Horseman.addResource(resource);
      expect(Horseman.hasResource("baz")).toEqual(true);
      expect(Horseman.hasResource("foo")).toEqual(false);
    });
  });
});
