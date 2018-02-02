import React from "react";
import BackgroundImage from "../BackgroundImage";
import dimensions from "../../providers/dimensions";

const Wrapped = dimensions(BackgroundImage);

const ResponsiveBackgroundImage = props => (
  <Wrapped {...props} boundaries={props.srcset.map(s => s.width)} />
);

ResponsiveBackgroundImage.defaultProps = {
  srcset: [],
};

ResponsiveBackgroundImage.propTypes = {
  ...BackgroundImage.propTypes,
};

export default ResponsiveBackgroundImage;
