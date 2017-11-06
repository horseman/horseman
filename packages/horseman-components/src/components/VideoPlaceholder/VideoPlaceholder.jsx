import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import ResponsiveBackgroundImage from "../ResponsiveBackgroundImage";
import { imageType } from "../../types";
import PlayButtonContainer from "./PlayButtonContainer";

const StyledVideoPlaceholder = styled(ResponsiveBackgroundImage)`
  /**
   * establish a 16/9 aspect ratio for the default video, if we otherwise don't
   * want to fill the container.
   */
  padding-top: ${props => (props.fill ? 0 : `${9 / 16 * 100}%`)};
  overflow: visible;

  ${({ fill }) =>
    fill &&
    css`
      position: absolute;
      padding-top: 56.25%;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      height: 100%;
    `};
`;

const VideoPlaceholder = ({
  bgImage,
  playPosition,
  onClick,
  fill,
  playComponent,
}) => (
  <StyledVideoPlaceholder {...bgImage} fill={fill}>
    <PlayButtonContainer position={playPosition}>
      <playComponent onClick={onClick} />
    </PlayButtonContainer>
  </StyledVideoPlaceholder>
);

VideoPlaceholder.defaultProps = {
  fill: false,
  playPosition: "center",
  onClick: () => {},
};

VideoPlaceholder.propTypes = {
  /**
   * Pass true to make the video placeholder fill it's container and not
   * conform to a 16/9 aspect ratio
   */
  fill: PropTypes.bool,

  /**
   * Where should the play button be positioned within this placeholder.
   */
  playPosition: PropTypes.oneOf(["left", "right", "center"]),

  /**
   * What image will be used for the video placeholder image
   */
  bgImage: PropTypes.shape({ ...imageType }).isRequired,

  /**
   * What should happen when the play button is clicked
   */
  onClick: PropTypes.func,

  /**
   * Will be rendered as the play button overlaying the video image.
   */
  playComponent: PropTypes.node.isRequired,
};

/**
 * @component
 */
export default VideoPlaceholder;
