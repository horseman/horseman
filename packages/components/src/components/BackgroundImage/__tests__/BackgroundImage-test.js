import React from "react";
import { shallow } from "enzyme";

import BackgroundImage from "../";

describe("BackgroundImage", () => {
  const image = {
    src: "default",
    srcset: [
      {
        src: "default",
        width: 100,
      },
      {
        src: "larger",
        width: 200,
      },
      {
        src: "largest",
        width: 300,
      },
    ],
  };

  test("renders correctly", () => {
    const wrapper = shallow(
      <BackgroundImage {...image}>foo</BackgroundImage>,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test("renders correctly filled", () => {
    const wrapper = shallow(
      <BackgroundImage {...image} fill>
        foo
      </BackgroundImage>,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test("renders correctly without a srcset passed in", () => {
    const wrapper = shallow(
      <BackgroundImage src="default" width={10}>
        foo
      </BackgroundImage>,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  describe("renders correct src with different srcsets", () => {
    image.srcset.forEach(srcset => {
      test(`test ${srcset.src}`, () => {
        const wrapper = shallow(
          <BackgroundImage {...image} width={srcset.width - 1}>
            foo
          </BackgroundImage>,
        ).dive();
        expect(wrapper).toMatchSnapshot();
      });
    });
    test("uses the largest image when width is larger than all available srcsets", () => {
      const wrapper = shallow(
        <BackgroundImage {...image} width={500}>
          foo
        </BackgroundImage>,
      ).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
