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
  // Sort the srcset by width from largest to smallest
  const sortedSrcset = srcset.slice().sort((a, b) => a.width < b.width);

  const items = sortedSrcset.map(s => (
    <source key={s.src} media={`(min-width:${s.width}px)`} srcSet={s.src} />
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
