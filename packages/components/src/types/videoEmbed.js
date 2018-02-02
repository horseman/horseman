import PropTypes from "prop-types";

/**
 * Representation of an embedded video object not originting from a
 * video provider.
 */
export default {
  id: PropTypes.string.isRequired,
  source: PropTypes.oneOf(["youtube", "vimeo"]).isRequired,
};
