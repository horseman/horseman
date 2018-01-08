import Horseman from "../Horseman";

describe("Horseman singleton", () => {
  test("constructor", () => {
    expect(Horseman.getAllResources().size).toEqual(0);
  });

  describe("adding & getting resources", () => {
    test("adding", () => {
      const newResource = {
        successAction: "foo",
        endpoint: "bar",
      };

      Horseman.addResource(newResource);

      expect(Horseman.getAllResources().has(newResource)).toEqual(true);
    });
    test("getting", () => {
      const newResource = {
        successAction: "biz",
        endpoint: "baz",
      };
      Horseman.addResource(newResource);
      expect(Horseman.getAllResources().size).toEqual(2);
    });
  });
});
