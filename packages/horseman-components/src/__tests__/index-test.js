import * as HorsemanComponents from "../index";

import RichText from "../components/RichText";
import TwoColumn from "../components/TwoColumn";
import Picture from "../components/Picture";
import List from "../components/List";
import ResponsiveBackgroundImage from "../components/ResponsiveBackgroundImage";

describe("horseman.js index", () => {
  describe("should export", () => {
    test("the Correct Number of items", () => {
      expect(Object.keys(HorsemanComponents)).toHaveLength(5);
    });
    test("RichText", () => {
      expect(typeof HorsemanComponents.RichText).toBe("function");
      expect(HorsemanComponents.RichText).toEqual(RichText);
    });
    test("TwoColumn", () => {
      expect(typeof HorsemanComponents.TwoColumn).toBe("function");
      expect(HorsemanComponents.TwoColumn).toEqual(TwoColumn);
    });
    test("Picture", () => {
      expect(typeof HorsemanComponents.Picture).toBe("function");
      expect(HorsemanComponents.Picture).toEqual(Picture);
    });
    test("List", () => {
      expect(typeof HorsemanComponents.List).toBe("function");
      expect(HorsemanComponents.List).toEqual(List);
    });
    test("ResponsiveBackgroundImage", () => {
      expect(typeof HorsemanComponents.List).toBe("function");
      expect(HorsemanComponents.ResponsiveBackgroundImage).toEqual(
        ResponsiveBackgroundImage,
      );
    });
  });
});
