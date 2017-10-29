/* eslint-env mocha */

import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

import NavItem from "../../atoms/NavItem/NavItem";
import NavList, { NavItemContainer } from "./NavList";

describe("NavList", () => {
  it("should render the appropriate number of NavItemContainers", () => {
    let wrapper = shallow(
      <NavList
        navItems={[
          {
            to: "#",
            text: "Tours",
          },
          {
            to: "#",
            text: "Park Guide",
          },
        ]}
      />,
    );
    expect(wrapper.find(NavItemContainer)).to.have.length(2);

    wrapper = shallow(
      <NavList
        navItems={[
          {
            to: "#",
            text: "Tours",
          },
          {
            to: "#",
            text: "Foo",
          },
          {
            to: "#",
            text: "Park Guide",
          },
        ]}
      />,
    );
    expect(wrapper.find(NavItemContainer)).to.have.length(3);
  });

  it("each Container should render a single NavItem with correct props", () => {
    const navItems = [
      {
        to: "#",
        text: "Tours",
      },
      {
        to: "#",
        text: "Foo",
      },
      {
        to: "#",
        text: "Park Guide",
      },
    ];

    const wrapper = shallow(<NavList navItems={navItems} />);
    const containers = wrapper.find(NavItemContainer);

    containers.forEach((container, index) => {
      const item = container.dive().find(NavItem);
      expect(item).to.have.length(1);
      expect(item.props().to).to.equal(navItems[index].to);
      expect(item.props().text).to.equal(navItems[index].text);
    });
  });
});
