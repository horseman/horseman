import React from "react";
import { shallow } from "enzyme";

import List from "../";

describe("List", () => {
  test("renders with a base and default mobileBase", () => {
    const wrapper = shallow(
      <List base={2}>
        <div />
        <div />
      </List>,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test("modifies the basis to prevent trailing items.", () => {
    const wrapper = shallow(
      <List base={3}>
        <div />
        <div />
        <div />
        <div />
      </List>,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test("Create the correct number of trailing empty children to force display", () => {
    const wrapper = shallow(
      <List base={3}>
        <div />
        <div />
        <div />
        <div />
        <div />
      </List>,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
