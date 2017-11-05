import { css } from "styled-components";

const sizes = {
  xs: ["max-width: 767px"],
  sm: ["min-width: 768px", "max-width: 991px"],
  smAndUp: ["min-width: 768px"],
  md: ["min-width: 992px", "max-width: 1199px"],
  mdAndUp: ["min-width: 992px"],
  lg: ["min-width: 1200px"],
  xl: ["min-width: 1400px"],
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
