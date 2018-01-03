import React from "react";
import { shallow } from "enzyme";

import OnMount from "../";

const TestComponent = () => <div />;

describe("OnMount", () => {
  test("Fires Component Did Mount only", () => {
    const spy = jest.spyOn(OnMount.prototype, "componentDidMount");
    const wrapper = shallow(
      <OnMount>
        <TestComponent />
      </OnMount>,
    );
    expect(wrapper).toMatchSnapshot();
    expect(spy).toHaveBeenCalled();
  });

  test("Fires fireGtmEvent", () => {
    window.dataLayer = {
      push: obj => obj,
    };
    const windowSpy = jest.spyOn(window.dataLayer, "push");

    const spy = jest.spyOn(OnMount.prototype, "fireGtmEvent");
    const wrapper = shallow(
      <OnMount gtmEvent="loaded">
        <TestComponent />
      </OnMount>,
    );
    expect(wrapper).toMatchSnapshot();
    const event = "loaded";
    expect(spy).toHaveBeenCalled();
    expect(windowSpy).toHaveBeenCalledWith({ event });
  });
});
