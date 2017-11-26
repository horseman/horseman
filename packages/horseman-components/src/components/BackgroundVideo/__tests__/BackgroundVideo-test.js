import React from "react";
import { shallow } from "enzyme";

import BackgroundVideo from "../";
import { Video, Content } from "../Wrappers";

describe("BackgroundVideo", () => {
  test("renders correctly", () => {
    const wrapper = shallow(
      <BackgroundVideo src="foo" type="bar">
        foo
      </BackgroundVideo>,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
  test("Video", () => {
    const wrapper = shallow(<Video />);
    expect(wrapper).toMatchSnapshot();
  });
  test("Content", () => {
    const wrapper = shallow(<Content />);
    expect(wrapper).toMatchSnapshot();
  });
});
