import React from "react";
import { shallow } from "enzyme";

import VideoPlaceholder from "../";

describe("VideoPlaceholder", () => {
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
      <VideoPlaceholder playComponent={<div />} bgImage={image} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
