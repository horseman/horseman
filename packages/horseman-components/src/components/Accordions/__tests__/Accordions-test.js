import React from "react";
import { shallow } from "enzyme";

import Accordions from "../";

const UserWrapper = () => <div />;
const UserLabel = () => <div />;
const UserContent = () => <div />;

const data = {
  wrapper: UserWrapper,
  label: UserLabel,
  content: UserContent,
  accordions: [
    {
      heading: "Foo Bar?",
      content: "Hello World",
    },
    {
      heading: "Biz Baz",
      content: "lorem ipsum",
    },
  ],
};

describe("Accordions", () => {
  test("renders correctly", () => {
    const wrapper = shallow(<Accordions {...data} />);
    expect(wrapper).toMatchSnapshot();
  });
  describe("handles state correctly", () => {
    const wrapper = shallow(<Accordions {...data} />);

    test("has no open item by default", () => {
      expect(wrapper.state().openItem).toEqual("");
    });

    test("opens items when you click the label", () => {
      wrapper
        .find(UserLabel)
        .first()
        .simulate("click");
      expect(wrapper.state().openItem).toEqual(data.accordions[0].heading);
      expect(wrapper).toMatchSnapshot();
    });

    test("closes the item when you click it's label", () => {
      wrapper
        .find(UserLabel)
        .first()
        .simulate("click");
      expect(wrapper.state().openItem).toEqual("");
    });
  });
});
