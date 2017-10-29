import BackgroundImage from "../BackgroundImage";
import * as Dimensions from "../../providers/Dimensions";

// Check for Window before importing dimension so we don't break SSR
const dimensions = typeof window !== "undefined" ?
    Dimensions.Browser : Dimensions.Node;

export default dimensions(BackgroundImage);
