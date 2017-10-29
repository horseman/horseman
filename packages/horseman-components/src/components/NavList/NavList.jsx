import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";

/**
 * The NavItemContainer is responsible for spacing out the NavItem components
 * within the NavList
 */
export const NavItemContainer = styled.li`
    position: relative;
    overflow: visible;
    margin-right: 1em;

    &:last-child {
      margin-right: 0;
    }
  `;

const NavListContainer = ({ Dropdown, NavItem }) => {

  const noop = () => {};

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
    vertical-align: baseline;
  `;


  // Will absolutely position the container undernath the nav list.
  const DropdownContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
  `;

  const NavList = ({ navItems, toggleDropdown, ...rest }) => {
    // Iterate through each navItem and create out list item structure.
    const items = navItems.map(item => {
      const openNav = item.subnav && item.opened;
      const hasChildren = item.subnav && item.subnav.length > 0;

      // We want the dropdown container to toggle the dropdown when we click
      // outside of the item itself. This HOC will handle adding the appropriate
      // events to the document.
      const EnhancedDropdownContainer = onClickOutside(DropdownContainer, {
        handleClickOutside: () => e => toggleDropdown(e, item),
      });

      return (
        <NavItemContainer key={item.text}>
          <NavItem
            selected={item.opened}
            dropdown={openNav ? "open" : "close"}
            hasChildren={hasChildren}
            onClick={e =>
              hasChildren && !openNav ? toggleDropdown(e, item) : noop}
            {...item}
          />
          {openNav && (
            <EnhancedDropdownContainer eventTypes={["click"]}>
              <Dropdown navItems={item.subnav} />
            </EnhancedDropdownContainer>
          )}
        </NavItemContainer>
      );
    });

    return <StyledNavList {...rest}>{items}</StyledNavList>;
  };

  NavList.defaultProps = {
    toggleDropdown: noop,
  };

  NavList.propTypes = {
    /**
     * Array of Navigation Items
     */
    navItems: PropTypes.arrayOf(
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
     * This function will be called when a NavItem, having a subnav, is clicked
     */
    toggleDropdown: PropTypes.func,
  };

  return NavList;

}

export default NavListContainer;
