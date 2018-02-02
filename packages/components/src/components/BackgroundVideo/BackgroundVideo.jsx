import React from "react";
import PropTypes from "prop-types";

import { ComponentWrapper, Content, Video } from "./Wrappers";

const BackgroundVideo = ({ children, ...rest }) => (
  <ComponentWrapper>
    <Video>
      <source {...rest} />
    </Video>
    <Content>{children}</Content>
  </ComponentWrapper>
);

BackgroundVideo.propTypes = {
  children: PropTypes.node.isRequired,
  video: PropTypes.shape({
    src: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default BackgroundVideo;
