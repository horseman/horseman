import { css } from "styled-components";

const sizes = {
  xs: ["max-width: 566px"],
  sm: ["min-width: 567px", "max-width: 891px"],
  smAndUp: ["min-width: 567px"],
  md: ["min-width: 892px", "max-width: 999px"],
  mdAndUp: ["min-width: 892px"],
  lg: ["min-width: 1000px"],
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = c => {
    const mq = sizes[label];

    return css`
      @media (${mq.join(" ")}) {
        ${c};
      }
    `;
  };

  return acc;
}, {});

export default media;
