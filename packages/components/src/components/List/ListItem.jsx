import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import media from "../../styleUtils/media";

/**
 * Calculate the width based on the mobile base and the gutter
 */
const getItemWidth = (mobileBase, gutter) => {
  if (mobileBase > 1) {
    return `calc(${100 / mobileBase}% - ${gutter / 2}px)`;
  }
  return `${100 / mobileBase}%`;
};

const ListItem = styled.div`
  width: ${({ mobileBase, gutter }) => getItemWidth(mobileBase, gutter)};
  margin-top: ${({ gutter }) => gutter}px;

  &:nth-child(-n + ${props => props.mobileBase}) {
    margin-top: 0;
  }

  ${({ breakpoint }) =>
    media[breakpoint](css`
      width: calc(${({ base, gutter }) => `${100 / base}% - ${gutter / 2}px`});
      &:nth-child(-n + ${({ base }) => base}) {
        margin-top: 0em;
      }
    `)};
`;

ListItem.defaultProps = {
  gutter: 30,
  mobileBase: 1,
  breakpoint: "mdAndUp",
};

ListItem.propTypes = {
  base: PropTypes.number.isRequired,
  mobileBase: PropTypes.number,

  /**
   * The breakpoint at which the layout will go desktop to mobile
   */
  breakpoint: PropTypes.string,
};

export default ListItem;
