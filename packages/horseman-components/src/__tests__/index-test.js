import * as HorsemanComponents from "../index";

const components = [
  "RichText",
  "TwoColumn",
  "Picture",
  "List",
  "ResponsiveBackgroundImage",
  "TemplateBuilder",
];

describe("horseman.js index", () => {
  describe("should export", () => {
    test("the Correct Number of items", () => {
      expect(Object.keys(HorsemanComponents)).toHaveLength(components.length);
    });
    components.forEach(component => {
      test(component, () => {
        expect(typeof HorsemanComponents[component]).toBe("function");
        expect(HorsemanComponents[component]).toEqual(
          // eslint-disable-next-line import/no-dynamic-require
          require(`../components/${component}`).default,
        );
      });
    });
  });
});
