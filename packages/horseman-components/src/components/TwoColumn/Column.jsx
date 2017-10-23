import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import media from "../../styleUtils/media";

const Column = styled.div`
  flex-basis: 100%;
  order: ${({ order }) => order};
  overflow: hidden;
  position: relative;

  ${media.mdAndUp(css`
    flex-basis: calc(${({ basis, gutter }) => `${basis}% - ${gutter}px`});
    order: 0;
  `)};
`;

Column.defaultProps = {
  order: 0,
  basis: 50,
  gutter: 10,
};

Column.propTypes = {
  /**
   * Amount of space left over between the columns
   */
  gutter: PropTypes.number,

  /**
   * The width of the column on desktop.
   */
  basis: PropTypes.number,

  /**
   * Adds order on mobile viewports
   */
  order: PropTypes.number,
};

export default Column;
