import React from "react";
import { shallow } from "enzyme";

import ListItem from "../ListItem";

describe("ListItem", () => {
  test("renders with a base and default mobileBase", () => {
    const wrapper = shallow(<ListItem base={2} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("renders correctly with a mobileBase > 1", () => {
    const wrapper = shallow(<ListItem base={2} mobileBase={2} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("renders correctly with custom breakpoint", () => {
    const wrapper = shallow(
      <ListItem base={2} mobileBase={2} breakpoint="smAndUp" />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
