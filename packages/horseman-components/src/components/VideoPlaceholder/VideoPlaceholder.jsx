import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { imageType } from "../../types";

import ResponsiveBackgroundImage from "../ResponsiveBackgroundImage";
import PlayButtonContainer from "./PlayButtonContainer";

const StyledVideoPlaceholder = styled(({ fill, ...rest }) => (
  <ResponsiveBackgroundImage {...rest} />
))`
  /**
   * establish a 16/9 aspect ratio for the default video, if we otherwise don't
   * want to fill the container.
   */
  padding-top: ${({ fill }) => (fill ? 0 : 9 / 16 * 100)}%;
  overflow: visible;
  height: 100%;
  position: relative;
`;

const VideoPlaceholder = ({ bgImage, playPosition, playButton, fill }) => (
  <StyledVideoPlaceholder {...bgImage} fill={fill}>
    <PlayButtonContainer position={playPosition}>
      {playButton}
    </PlayButtonContainer>
  </StyledVideoPlaceholder>
);

VideoPlaceholder.defaultProps = {
  fill: false,
  playPosition: "center",
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
   * The button to be rendered representing "play".
   */
  playButton: PropTypes.node.isRequired,

  /**
   * What image will be used for the video placeholder image
   */
  bgImage: PropTypes.shape({ ...imageType }).isRequired,
};

export default VideoPlaceholder;
