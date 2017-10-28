import BackgroundImage from "../BackgroundImage";
import dimensions from "../../providers/Dimensions";

// Have to check for Window or else dimensions will break SSR
const ResponsiveBackgroundImage = typeof window !== "undefined" ?
    dimensions(BackgroundImage) : BackgroundImage;

export default ResponsiveBackgroundImage;
