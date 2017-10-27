import PropTypes from "prop-types";
import styled from "styled-components";

const defaultSizes = {
  small: 768,
  medium: 992,
  large: 1200,
  xl: 1400,
  fauxWidth: 2500,
};

/**
 * Retreive the pixel width as a number based on the theme and size
 */
const getContainerWidth = (theme, size) => {
  const sizes = {
    ...defaultSizes,
    ...theme.containers,
  };

  return sizes[size];
};

const Container = styled.div`
  margin: 0 auto;
  padding: 0 1em;

  max-width: ${({ theme, baseFontSize, size }) =>
    `${getContainerWidth(theme, size) / baseFontSize}em`};
`;

Container.defaultProps = {
  baseFontSize: 16,
  size: "large",
};

Container.propTypes = {
  baseFontSize: PropTypes.number,
  size: PropTypes.string,
};

/**
 * @component
 */
export default Container;
