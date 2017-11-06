import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import media from "../../styleUtils/media";

/**
 * Container for the play button that will position it centered left or right.
 * This container is absolutely positioned within the VideoPlaceholder.
 *
 * NOTE: in mobile the play button is centered by default; left & right are only for bigger screens
 */
const PlayButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${media.mdAndUp(css`
    ${props => {
      switch (props.position) {
        case "left": {
          return css`
            left: 0;
            transform: translate(-50%, -50%);
          `;
        }
        case "right": {
          return css`
            right: 0;
            transform: translate(50%, -50%);
          `;
        }
        default: {
          return css`
            left: 50%;
            transform: translate(-50%, -50%);
          `;
        }
      }
    }};
  `)};
`;

PlayButtonContainer.defaultProps = {
  position: "center",
};

PlayButtonContainer.propTypes = {
  /**
   * Where should the play button be positioned within this container
   */
  position: PropTypes.oneOf(["left", "center", "right"]),
};

export default PlayButtonContainer;
