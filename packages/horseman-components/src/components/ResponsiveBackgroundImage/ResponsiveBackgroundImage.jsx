import BackgroundImage from "../BackgroundImage";
import dimensions from "../../providers/dimensions";

// Check for Window before importing dimension so we don't break SSR
const ResponsiveBackgroundImage =
  typeof window !== "undefined" ? dimensions(BackgroundImage) : BackgroundImage;

export default ResponsiveBackgroundImage;
