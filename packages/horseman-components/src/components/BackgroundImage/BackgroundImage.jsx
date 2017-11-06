import PropTypes from "prop-types";
import styled from "styled-components";

import { imageType } from "../../types";

const BackgroundImage = styled.div`
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  background-image: url(${({ src, srcset, width }) => {
    let url = "";
    if (!width) {
      url = src;
    } else {
      // Sort the srcset by width from smallest to largest
      const sortedSrcset = srcset.slice().sort((a, b) => a.width > b.width);

      // Find the smallest based on on the width
      const filteredSource = sortedSrcset.filter(set => set.width > width);

      // Get the best optimized version of the image to use based on width.
      url =
        filteredSource.length > 0
          ? filteredSource[0].src
          : sortedSrcset.pop().src;
    }

    return url;
  }});
`;

BackgroundImage.defaultProps = {
  srcset: [],
};

BackgroundImage.propTypes = {
  ...imageType,

  /**
   * Will display the background image within srcset that is optimized for the
   * pixel width given here.
   */
  width: PropTypes.number,
};

/**
 * @component
 */
export default BackgroundImage;
