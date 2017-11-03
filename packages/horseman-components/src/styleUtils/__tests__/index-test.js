import * as styleUtils from "../index";

const exports = ["media"];

describe("horseman.js index", () => {
  describe("should export", () => {
    test("the Correct Number of items", () => {
      expect(Object.keys(styleUtils)).toHaveLength(exports.length);
    });
    exports.forEach(e => {
      test(e, () => {
        expect(styleUtils[e]).toEqual(
          // eslint-disable-next-line import/no-dynamic-require
          require(`../${e}`).default,
        );
      });
    });
  });
});
