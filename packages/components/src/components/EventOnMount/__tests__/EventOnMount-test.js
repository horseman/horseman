import React from "react";
import { shallow } from "enzyme";

import EventOnMount from "../";

// eslint-disable-next-line
const TestComponent = ({ title }) => <div>{title}</div>;

describe("EventOnMount", () => {
  test("Fires onMount", () => {
    const caller = {
      onMount: obj => obj,
      onUpdate: obj => obj,
    };
    const mountSpy = jest.spyOn(caller, "onMount");
    const updateSpy = jest.spyOn(caller, "onUpdate");
    const wrapper = shallow(
      <EventOnMount onMount={caller.onMount} onUpdate={caller.onUpdate}>
        <TestComponent title="foo" />
      </EventOnMount>,
    );
    expect(wrapper).toMatchSnapshot();
    expect(mountSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledTimes(0);
    const NewComponent = <TestComponent title="bar" />;
    wrapper.setProps({ children: NewComponent });
    expect(mountSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledTimes(1);
  });
});
