import React from "react";
import { shallow } from "enzyme";

import ResponsiveBackgroundImage from "../";

describe("ResponsiveBackgroundImage", () => {
  const data = {
    src: "default",
    srcset: [
      {
        src: "default",
        width: 100,
      },
      {
        src: "foo",
        width: 200,
      },
      {
        src: "bar",
        width: 300,
      },
    ],
  };
  test("renders correctly", () => {
    const wrapper = shallow(<ResponsiveBackgroundImage {...data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
