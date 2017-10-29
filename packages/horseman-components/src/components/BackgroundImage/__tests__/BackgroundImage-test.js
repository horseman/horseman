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
      <BackgroundImage bgImage={image}>foo</BackgroundImage>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  describe("renders correct src with different srcsets", () => {
    image.srcset.forEach(srcset => {
      test(`test ${srcset.src}`, () => {
        const wrapper = shallow(
          <BackgroundImage bgImage={image} width={srcset.width - 1}>
            foo
          </BackgroundImage>,
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
    test("uses the largest image when width is larger than all available srcsets", () => {
      const wrapper = shallow(
        <BackgroundImage bgImage={image} width={500}>
          foo
        </BackgroundImage>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
