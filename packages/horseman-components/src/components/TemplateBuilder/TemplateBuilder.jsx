import React from "react";
import PropTypes from "prop-types";

const TemplateBuilder = ({ data, mappings }) => {
  const items = data.map((block, i) => {
    const { type, ...rest } = block;
    const Component = mappings[type];

    return typeof Component === "undefined" ? null : (
      // eslint-disable-next-line react/no-array-index-key
      <Component key={i} {...rest} />
    );
  });

  return <div>{items}</div>;
};

TemplateBuilder.defaultProps = {
  data: [],
};

TemplateBuilder.propTypes = {
  /**
   * The data that will be used to generate the templates.
   */
  mappings: PropTypes.object.isRequired,

  /**
   * The page builder array that will generate the pageBuilder.  Will render a
   * page builder block based on the `type` of block requested. Block types are
   * registered in the imported mappings file.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
    }),
  ),
};

export default TemplateBuilder;
