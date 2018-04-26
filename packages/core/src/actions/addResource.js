import ActionFactory from "../ActionFactory";
import * as types from "../constants/ActionTypes";

/**
 * The addResource action uses the ActionFactory to fetch a reource, and puts it
 * on the `horsemanResources` key in state.
 *
 * @param {string} endpoint The endpoint to fetch and put into state, the
 *                          endpoint will also be used as the key within the
 *                          `horsemanResources` state
 *                          location.
 */
export default endpoint =>
  ActionFactory(
    types.ADD_RESOURCE,
    state => typeof state.horsemanResources[endpoint] !== "undefined",
  )(endpoint);
