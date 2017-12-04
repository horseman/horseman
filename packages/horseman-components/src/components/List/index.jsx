import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ListItem from "./ListItem";

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: space-between;
  align-items: bottom;
`;

const List = ({ children, base, mobileBase, breakpoint, rebase }) => {
  const numItems = children.length;

  // The list basis is the number of items that will live on a single line in
  // desktop. The number of items composing the listBasis will never be larger
  // than the total number of items.
  const listBasis = base > numItems ? numItems : base;

  // If the base we are given forces the list to have a trailing single item
  // we need to rebase in order to never leave a trailing item.
  const nonTrailingBase =
    numItems % listBasis === 1 ? listBasis - 1 : listBasis;

  // determine if rebase is desired, use appropriate base.
  const activeBase = rebase ? nonTrailingBase : listBasis;

  const trailingItems = numItems % activeBase;
  const emptySlots = trailingItems ? activeBase - trailingItems : 0;

  /* eslint-disable react/no-array-index-key */
  const items = children.map((child, i) => (
    <ListItem
      key={i}
      mobileBase={mobileBase}
      base={activeBase}
      breakpoint={breakpoint}
    >
      {child}
    </ListItem>
  ));

  const placeholders = Array(emptySlots)
    .fill()
    .map((_, i) => (
      <ListItem key={i} mobileBase={mobileBase} base={activeBase} />
    ));
  /* eslint-enable react/no-array-index-key */

  return (
    <StyledList>
      {items}
      {placeholders}
    </StyledList>
  );
};

List.defaultProps = {
  mobileBase: 1,
  rebase: true,
};

List.propTypes = {
  /**
   * The items that will be listed over.
   */
  children: PropTypes.node.isRequired,

  /**
   * This is the number of items that will be displayed across on desktop
   */
  base: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,

  /**
   * This is the number of items that will be displayed across on mobile
   */
  mobileBase: PropTypes.oneOf([1, 2, 3]).isRequired,

  /**
   * The breakpoint at which the layout will go desktop to mobile
   */
  breakpoint: PropTypes.string,

  /**
   * Will re-base the list to never allow a single item on a line. If set to
   * false will use `base` as it is passed in, otherwise will alter the active
   * base depending on the amount of ListItems present
   */
  rebase: PropTypes.bool,
};

/**
 * @component
 */
export default List;
