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
  gutter,
  columnConfig,
  firstCol,
  secondCol,
  mobileFlip,
}) => (
  <StyledTwoColumn>
    <Column gutter={gutter / 2} order={mobileFlip ? 2 : 1} {...columnConfig[0]}>
      {firstCol}
    </Column>
    <Column gutter={gutter / 2} order={mobileFlip ? 1 : 2} {...columnConfig[1]}>
      {secondCol}
    </Column>
  </StyledTwoColumn>
);

TwoColumn.defaultProps = {
  columnConfig: [{}, {}],
  gutter: 10,
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
   * Changes the order of the columns on mobile
   */
  mobileFlip: PropTypes.bool,

  /**
   * Will drive the widths of the columns in desktop
   */
  columnConfig: PropTypes.arrayOf(PropTypes.shape(Column.propTypes)),
};

/**
 * @component
 */
export default TwoColumn;
