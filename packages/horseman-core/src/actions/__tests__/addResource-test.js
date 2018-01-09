import addResource from "../addResource";
import ActionFactory from "../../ActionFactory";
import * as types from "../../constants/ActionTypes";

jest.mock("../../ActionFactory");

describe("addResource", () => {
  describe("fires the correct action", () => {
    addResource("foo");

    test("action", () => {
      expect(ActionFactory.mock.calls[0][0]).toEqual(types.ADD_RESOURCE);
    });

    test("calls correct endpoint", () => {
      const innerMock = ActionFactory();
      expect(innerMock.mock.calls[0][0]).toEqual("foo");
    });

    describe("bypass", () => {
      test("bypasses", () => {
        const bypassFunc = ActionFactory.mock.calls[0][1];
        expect(
          bypassFunc({
            horsemanResources: {
              foo: true,
            },
          }),
        ).toEqual(true);
      });
      test("nobypass", () => {
        const bypassFunc = ActionFactory.mock.calls[0][1];
        expect(
          bypassFunc({
            horsemanResources: {
              bar: true,
            },
          }),
        ).toEqual(false);
      });
    });
  });
});
