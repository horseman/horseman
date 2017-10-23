import * as HorsemanComponents from "../index";

import RichText from "../components/RichText";
import TwoColumn from "../components/TwoColumn";
import Picture from "../components/Picture";

describe("horseman.js index", () => {
  describe("should export", () => {
    test("the Correct Number of items", () => {
      expect(Object.keys(HorsemanComponents)).toHaveLength(3);
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
  });
});
