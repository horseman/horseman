import "fetch-everywhere";
import * as types from "./constants/ActionTypes";

/**
 * Fetch a singular endpoint from an api and dispatches actions depending on
 * the result.
 *
 * @param successAction {string} The action to dispatch if a resource comes
 * back successfully.
 *
 * @return {function} Callback accepting an endpoint and dispatching the
 * actions
 */
export default successAction => endpoint => (dispatch, getState) => {
  if (typeof getState().horsemanResources[endpoint] !== "undefined") {
    return null;
  }

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
