import React from "react";
import styled from "styled-components";

import { imageType } from "../../types";

const StyledPicture = styled.picture`
  img {
    max-width: 100%;
    width: 100%;
    height: auto;
    display: block;
  }
`;

const Picture = ({ src, srcset, alt, ...rest }) => {
  const items = srcset.map(sourceSet => (
    <source
      key={sourceSet.src}
      media={`(min-width:${sourceSet.width}px)`}
      srcSet={sourceSet.src}
    />
  ));

  return (
    <StyledPicture>
      {items}
      <img srcSet={src} alt={alt} {...rest} />
    </StyledPicture>
  );
};

Picture.defaultProps = {
  alt: " ",
  srcset: [],
};

Picture.propTypes = {
  ...imageType,
};

/**
 * @component
 */
export default Picture;
