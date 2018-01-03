import React from "react";
import { shallow } from "enzyme";

import EventOnMount from "../";

const TestComponent = () => <div />;

describe("EventOnMount", () => {
  test("Fires Component Did Mount only", () => {
    const spy = jest.spyOn(EventOnMount.prototype, "componentDidMount");
    const gtmSpy = jest.spyOn(EventOnMount.prototype, "fireGtmEvent");
    const wrapper = shallow(
      <EventOnMount>
        <TestComponent />
      </EventOnMount>,
    );
    expect(wrapper).toMatchSnapshot();
    expect(spy).toHaveBeenCalled();
    expect(gtmSpy).toHaveBeenCalledTimes(0);
  });

  test("Fires fireGtmEvent", () => {
    window.dataLayer = {
      push: obj => obj,
    };
    const windowSpy = jest.spyOn(window.dataLayer, "push");
    const gtmSpy = jest.spyOn(EventOnMount.prototype, "fireGtmEvent");
    const wrapper = shallow(
      <EventOnMount gtmEvent="loaded">
        <TestComponent />
      </EventOnMount>,
    );
    expect(wrapper).toMatchSnapshot();
    const event = "loaded";
    expect(gtmSpy).toHaveBeenCalled();
    expect(windowSpy).toHaveBeenCalledWith({ event });
  });
});
