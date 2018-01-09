import "fetch-everywhere";
import Horseman from "./Horseman";
import * as types from "./constants/ActionTypes";

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

  return fetch(new Request(endpoint, { redirect: "manual" }), {
    credentials: "include",
  }).then(response => {
    if (response.status === 200) {
      return response
        .json()
        .then(payload => {
          // We don't want any errors thrown during the dispatch to be caught
          // by our promise chain. So run the try/catch here.
          try {
            dispatch({
              type: successAction,
              meta: { endpoint, status: response.status },
              payload,
              response,
            });
          } catch (e) {
            if (process.env.NODE_ENV !== "production") {
              // eslint-disable-next-line no-console
              console.warn(e);
            }
          }
        })
        .catch(() => dispatch({ type: types.BAD_JSON, meta: { endpoint } }));
    }
    return response
      .json()
      .then(payload =>
        dispatch({
          type: types.RESOURCE_FAIL,
          meta: { endpoint, status: response.status },
          payload,
          response,
        }),
      )
      .catch(() =>
        dispatch({
          type: types.RESOURCE_FAIL,
          meta: { endpoint, status: response.status },
          payload: {},
          response,
        }),
      );
  });
};
