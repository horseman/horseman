import Horseman from "./Horseman";
import * as types from "./constants/ActionTypes";
import fetchResource from "./fetchResource";

/**
 * Fetch a singular endpoint from an api and dispatches actions depending on
 * the result.
 *
 * @param successAction {string} The action to dispatch if a resource comes
 * back successfully.
 *
 * @param bypass {func} Function that will be fired when checking if we should
 * bypass the fetch.
 *
 * @return {Promise} Callback accepting an endpoint and dispatching the
 * actions
 */
export default (successAction, bypass = () => false) => endpoint => (
  dispatch,
  getState,
) => {
  if (bypass(getState())) {
    return Promise.resolve("Bypass");
  }

  Horseman.addResource({ endpoint, action: successAction });
  dispatch({ type: types.RESOURCE_REQUEST, meta: { endpoint } });

  return fetchResource({
    endpoint,
    dispatch,
    successAction,
  });
};
