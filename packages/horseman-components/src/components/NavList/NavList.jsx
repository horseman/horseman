import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";

import ItemContainer from "./ItemContainer";
import DropdownContainer from "./DropdownContainer";

// This is the outer unordered list container. It displays flex and contains
// all the accompanying NavItem components on a single line.
const StyledNavList = styled.ul`
  align-items: center;
  border: 0;
  display: flex;
  font: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavList = ({ navItem, dropdown, nav, toggleDropdown, ...rest }) => {
  // Iterate through each navItem and create out list item structure.
  const NavComponent = navItem;
  const DropdownComponent = dropdown;
  const items = nav.map(item => {
    const hasChildren = item.subnav && item.subnav.length > 0;

    // We want the dropdown container to toggle the dropdown when we click
    // outside of the item itself. This HOC will handle adding the appropriate
    // events to the document.
    const EnhancedDropdownContainer = onClickOutside(DropdownContainer, {
      handleClickOutside: () => e => toggleDropdown(e, item),
    });

    return (
      <ItemContainer key={item.text}>
        <NavComponent
          {...item}
          onClick={e =>
            hasChildren && !item.open ? toggleDropdown(e, item) : () => {}
          }
        />
        {item.open && (
          <EnhancedDropdownContainer eventTypes={["click"]}>
            <DropdownComponent nav={item.subnav} />
          </EnhancedDropdownContainer>
        )}
      </ItemContainer>
    );
  });

  return <StyledNavList {...rest}>{items}</StyledNavList>;
};

NavList.propTypes = {
  /**
   * Array of Navigation Items
   */
  nav: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Drive the dropdown state
       */
      subnav: PropTypes.arrayOf(
        PropTypes.shape({
          to: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        }),
      ),

      /**
       * Navigation Item Anchor URL, If given this nav item will be a Link to
       * the desired location.
       */
      to: PropTypes.string,

      /**
       * Navigation Item Text
       */
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,

  /**
   * Will be rendered in the slot for the item
   */
  navItem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,

  /**
   * Will be rendered when a dropdown should be displayed.
   */
  dropdown: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,

  /**
   * This function will be called when a NavItem, having a subnav, is clicked
   */
  toggleDropdown: PropTypes.func,
};

export default NavList;
