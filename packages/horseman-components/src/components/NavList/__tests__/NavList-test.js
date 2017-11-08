import React from "react";
import { shallow } from "enzyme";

import NavList from "../";
import DropdownContainer from "../DropdownContainer";
import ItemContainer from "../ItemContainer";

/* eslint-disable react/prop-types */
const Item = ({ text }) => <div>{text}</div>;

const Dropdown = ({ nav }) => <li>{nav.map(n => <ul>{n.text}</ul>)}</li>;

describe("NavList", () => {
  const data = {
    navItem: Item,
    dropdown: Dropdown,
    nav: [
      {
        to: "#",
        text: "foo",
      },
      {
        to: "#",
        text: "bar",
        subnav: [
          {
            to: "biz",
            text: "baz",
          },
        ],
      },
    ],
  };
  test("renders correctly", () => {
    const wrapper = shallow(<NavList {...data} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("item container", () => {
    const wrapper = shallow(<ItemContainer>foo</ItemContainer>);
    expect(wrapper).toMatchSnapshot();
  });

  test("dropdown container", () => {
    const wrapper = shallow(<DropdownContainer>foo</DropdownContainer>);
    expect(wrapper).toMatchSnapshot();
  });
});
