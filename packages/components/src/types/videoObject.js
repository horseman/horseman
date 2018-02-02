import PropTypes from "prop-types";

/**
 * Representation of an embedded video from a video service
 */
export default {
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
