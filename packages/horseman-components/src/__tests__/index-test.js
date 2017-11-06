import * as HorsemanComponents from "../index";

const components = [
  "RichText",
  "TwoColumn",
  "Picture",
  "Carousel",
  "List",
  "ResponsiveBackgroundImage",
  "TemplateBuilder",
  "Container",
  "Modal",
];

const exportedUtils = ["media"];

const exportedActions = ["modal"];

describe("horseman.js index", () => {
  describe("should export", () => {
    describe("components", () => {
      test("the Correct Number of items", () => {
        expect(Object.keys(HorsemanComponents)).toHaveLength(
          components.length + exportedUtils.length + exportedActions.length * 2,
        );
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
    describe("utils", () => {
      exportedUtils.forEach(e => {
        test(e, () => {
          expect(HorsemanComponents.utils[e]).toEqual(
            // eslint-disable-next-line import/no-dynamic-require
            require(`../styleUtils/${e}`).default,
          );
        });
      });
    });
    describe("actions and reducers", () => {
      exportedActions.forEach(e => {
        test(`${e} reducer`, () => {
          expect(HorsemanComponents.reducers[e]).toEqual(
            // eslint-disable-next-line import/no-dynamic-require
            require(`../reducers/${e}`).default,
          );
        });

        test(`${e} action`, () => {
          expect(HorsemanComponents.actions[e]).toEqual(
            // eslint-disable-next-line import/no-dynamic-require
            require(`../actions/${e}`),
          );
        });
      });
    });
  });
});
