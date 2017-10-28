import BackgroundImage from "../BackgroundImage";

// Check for Window before importing dimension so we don't break SSR
const dimensions = typeof window !== "undefined" ?
    require("../../providers/Dimensions") : component => component;

export default dimensions(BackgroundImage);
