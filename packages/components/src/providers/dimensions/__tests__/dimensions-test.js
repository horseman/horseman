import { shouldUpdate } from "../";

describe("dimensions", () => {
  describe("Processes bound traversals", () => {
    const data = [
      { oldWidth: 700, newWidth: 800, boundaries: [750], result: true },
      { oldWidth: 700, newWidth: 800, boundaries: [800], result: true },
      { oldWidth: 700, newWidth: 800, boundaries: [900], result: false },
      { oldWidth: 800, newWidth: 900, boundaries: [900], result: true },
      { oldWidth: 900, newWidth: 900, boundaries: [900], result: false },
      { oldWidth: 900, newWidth: 800, boundaries: [850], result: true },
    ];
    data.forEach(datum => {
      test(`processes correctly ${JSON.stringify(datum)}`, () => {
        const { result, ...rest } = datum;
        expect(shouldUpdate(rest)).toEqual(result);
      });
    });
  });
});
