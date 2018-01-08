/**
 * @module horseman.js
 */
import { ConnectedResourceProvider as ResourceProvider } from "./providers/ResourceProvider";
import { ConnectedPaginationProvider as PaginationProvider } from "./providers/PaginationProvider";
import prefetch from "./providers/prefetch";
import paginator from "./providers/paginator";
import Horseman from "./Horseman";
import horsemanReducer from "./reducers/horsemanReducer";
import horsemanRouteReducer from "./reducers/horsemanRouteReducer";
import horsemanPaginationReducer from "./reducers/horsemanPaginationReducer";
import ActionFactory from "./ActionFactory";

const horsemanReducers = {
  horsemanResources: horsemanReducer,
  horsemanRoutes: horsemanRouteReducer,
  horsemanPaginations: horsemanPaginationReducer,
};

export {
  ActionFactory,
  horsemanReducers,
  prefetch,
  paginator,
  ResourceProvider,
  PaginationProvider,
};

export default Horseman;
