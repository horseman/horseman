import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Column from "./Column";

const StyledTwoColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const TwoColumn = ({
  breakpoint,
  columnConfig,
  firstCol,
  gutter,
  mobileFlip,
  secondCol,
}) => (
  <StyledTwoColumn>
    <Column
      breakpoint={breakpoint}
      gutter={gutter / 2}
      order={mobileFlip ? 2 : 1}
      {...columnConfig[0]}
    >
      {firstCol}
    </Column>
    <Column
      breakpoint={breakpoint}
      gutter={gutter / 2}
      order={mobileFlip ? 1 : 2}
      {...columnConfig[1]}
    >
      {secondCol}
    </Column>
  </StyledTwoColumn>
);

TwoColumn.defaultProps = {
  columnConfig: [{}, {}],
  gutter: 10,
  breakpoint: "mdAndUp",
};

TwoColumn.propTypes = {
  /**
   * The first content area
   */
  firstCol: PropTypes.node.isRequired,

  /**
   * The second content area
   */
  secondCol: PropTypes.node.isRequired,

  /**
   * The amount of space that will be between the two columns
   */
  gutter: PropTypes.number,

  /**
   * Changes the order of the columns on mobile
   */
  mobileFlip: PropTypes.bool,

  /**
   * Will drive the widths of the columns in desktop
   */
  columnConfig: PropTypes.arrayOf(PropTypes.shape(Column.propTypes)),

  /**
   * The breakpoint at which the layout will go from stacked to two columns
   */
  breakpoint: PropTypes.string,
};

/**
 * @component
 */
export default TwoColumn;
