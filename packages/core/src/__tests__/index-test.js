import * as horseman from "../";

import paginator from "../providers/paginator";
import Horseman from "../Horseman";
import prefetch from "../providers/prefetch";
import { ConnectedResourceProvider } from "../providers/ResourceProvider";
import { ConnectedPaginationProvider } from "../providers/PaginationProvider";
import horsemanReducer from "../reducers/horsemanReducer";
import horsemanRouteReducer from "../reducers/horsemanRouteReducer";
import fetchResource from "../fetchResource";
import ActionFactory from "../ActionFactory";

describe("horseman.js index", () => {
  describe("should export", () => {
    test("reducers", () => {
      expect(typeof horseman.horsemanReducers.horsemanResources).toBe(
        "function",
      );

      expect(horseman.horsemanReducers.horsemanResources).toEqual(
        horsemanReducer,
      );

      expect(typeof horseman.horsemanReducers.horsemanRoutes).toBe("function");
      expect(horseman.horsemanReducers.horsemanRoutes).toEqual(
        horsemanRouteReducer,
      );
    });
    test("the PaginationProvider", () => {
      expect(horseman.PaginationProvider).toEqual(ConnectedPaginationProvider);
    });
    test("the ActionFactory", () => {
      expect(horseman.ActionFactory).toEqual(ActionFactory);
    });
    test("the ResourceProvider", () => {
      expect(horseman.ResourceProvider).toEqual(ConnectedResourceProvider);
    });
    test("the prefetch provider", () => {
      expect(horseman.prefetch).toEqual(prefetch);
    });
    test("the paginator provider", () => {
      expect(horseman.paginator).toEqual(paginator);
    });
    test("the default horseman object", () => {
      expect(horseman.default).toEqual(Horseman);
    });
    test("fetchResource", () => {
      expect(horseman.fetchResource).toEqual(fetchResource);
    });
    test("the Correct Number of items", () => {
      expect(Object.keys(horseman)).toHaveLength(8);
    });
  });
});
