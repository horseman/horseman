import PropTypes from "prop-types";

/**
 * Representation of an image with a srcset array being passed along for
 * responsive display.
 */
export default {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  srcset: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  ),
};
