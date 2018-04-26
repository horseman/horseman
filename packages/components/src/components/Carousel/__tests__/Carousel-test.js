import React from "react";
import { shallow } from "enzyme";

import Carousel from "../";

describe("", () => {
  const images = [
    {
      src: "default",
      srcset: [
        {
          src: "foo",
          width: 100,
        },
        {
          src: "bar",
          width: 200,
        },
      ],
    },
    {
      src: "second",
      text: "Overlay",
    },
  ];
  test("renders correctly", () => {
    const wrapper = shallow(<Carousel images={images} />).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
