import * as HorsemanComponents from "../index";

const components = [
  "Carousel",
  "Container",
  "List",
  "Modal",
  "NavList",
  "Picture",
  "ResponsiveBackgroundImage",
  "RichText",
  "TemplateBuilder",
  "TwoColumn",
];
const providers = ["dimensions"];

const exportedUtils = ["media"];

const exportedActions = ["modal", "menus"];

describe("horseman.js index", () => {
  describe("should export", () => {
    describe("components", () => {
      test("the Correct Number of items", () => {
        expect(Object.keys(HorsemanComponents)).toHaveLength(
          // We export the components, providers plus the `actions`, `reducers`, and
          // `utils` keys
          components.length + providers.length + 3,
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
    describe("providers", () => {
      providers.forEach(provider => {
        test(provider, () => {
          expect(HorsemanComponents[provider]).toEqual(
            // eslint-disable-next-line import/no-dynamic-require
            require(`../providers/${provider}`).default,
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
