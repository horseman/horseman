import React from "react";
import PropTypes from "prop-types";

const TemplateBuilder = ({ data, resolver }) => {
  const items = data.map((block, i) => {
    const { type, ...rest } = block;
    const Component = resolver(type);

    return Component ? (
      // eslint-disable-next-line react/no-array-index-key
      <Component key={i} {...rest} />
    ) : null;
  });

  return <div>{items}</div>;
};

TemplateBuilder.defaultProps = {
  data: [],
};

TemplateBuilder.propTypes = {
  /**
   * Will be used to resolve the component based on the type requested
   */
  resolver: PropTypes.func.isRequired,

  /**
   * The page builder array that will generate the pageBuilder.  Will render a
   * page builder block based on the `type` of block requested. Block types are
   * resolved via the mappings file.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
    }),
  ),
};

export default TemplateBuilder;
