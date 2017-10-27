import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  padding: 0 1em;

  max-width: ${({ theme, baseFontSize, size }) =>
    `${theme[size] / baseFontSize}em`};
`;

Container.defaultProps = {
  baseFontSize: 16,
  size: "large",
  theme: {
    small: 768,
    medium: 992,
    large: 1200,
    xl: 1400,
    fauxWidth: 2500,
  },
};

Container.propTypes = {
  baseFontSize: PropTypes.number,
  size: PropTypes.string,
};

/**
 * @component
 */
export default Container;
