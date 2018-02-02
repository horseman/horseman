import { matchPath } from "react-router-dom";
import ParseEndpoint from "./ParseEndpoint";

const getRoutePreloadData = (routes = [], path) => {
  let data = "";
  const hasData = routes.some(route => {
    const routeInfo = { path: route.props.path, exact: route.props.exact };
    const match = matchPath(path, routeInfo);
    if (match && typeof route.props.data !== "undefined") {
      const { params } = match;
      params.url = match.url;
      data = ParseEndpoint(route.props.data, params);
      return true;
    }
    return false;
  });

  if (hasData) {
    return data;
  }

  return null;
};
export default getRoutePreloadData;
