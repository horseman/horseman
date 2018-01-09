/**
 * @module horseman.js
 */
import { ConnectedResourceProvider as ResourceProvider } from "./providers/ResourceProvider";
import { ConnectedPaginationProvider as PaginationProvider } from "./providers/PaginationProvider";
import PageLoadedProvider from "./providers/PageLoadedProvider";
import prefetch from "./providers/prefetch";
import paginator from "./providers/paginator";
import Horseman from "./Horseman";
import horsemanReducer from "./reducers/horsemanReducer";
import horsemanLoadingReducer from "./reducers/horsemanLoadingReducer";
import horsemanRouteReducer from "./reducers/horsemanRouteReducer";
import horsemanPaginationReducer from "./reducers/horsemanPaginationReducer";
import ActionFactory from "./ActionFactory";

const horsemanReducers = {
  horsemanResources: horsemanReducer,
  horsemanRoutes: horsemanRouteReducer,
  horsemanPaginations: horsemanPaginationReducer,
  horsemanLoadingStatus: horsemanLoadingReducer,
};

export {
  ActionFactory,
  horsemanReducers,
  prefetch,
  paginator,
  PageLoadedProvider,
  ResourceProvider,
  PaginationProvider,
};

export default Horseman;
