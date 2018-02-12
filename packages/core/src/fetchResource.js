import "fetch-everywhere";
import * as types from "./constants/ActionTypes";

import morphResponse from "./morphResponse";

/**
 * Will fetch a resources from a remote endpoint and dispatch an action when
 * successfully returned.
 *
 * @return {Promise}
 */
export default ({ endpoint, dispatch, successAction }) =>
  fetch(new Request(endpoint, { redirect: "manual" }), {
    credentials: "include",
  })
    .then(response => {
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
                response: morphResponse(response),
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

      if (typeof window === "undefined") {
        throw response;
      }

      return response
        .json()
        .then(payload =>
          dispatch({
            type: types.RESOURCE_FAIL,
            meta: { endpoint, status: response.status },
            payload,
            response: morphResponse(response),
          }),
        )
        .catch(() =>
          dispatch({
            type: types.RESOURCE_FAIL,
            meta: { endpoint, status: response.status },
            payload: {},
            response: morphResponse(response),
          }),
        );
    })
    // None of this is tested as of yet. This is experimental and most likely
    // will not exist in this form at the end of the day.
    .catch(response => {
      if (response.status === 301 || response.status === 302) {
        return response
          .json()
          .then(payload => {
            dispatch({
              type: types.ADD_RESOURCE,
              meta: { endpoint, status: response.status },
              payload,
              response: morphResponse(response),
            });
          })
          .catch(() =>
            dispatch({
              type: types.ADD_RESOURCE,
              meta: { endpoint, status: response.status },
              payload: {},
              response: { statusCode: response.status, url: "/" },
            }),
          );
      }

      return dispatch({
        type: "@@horseman/FETCH_RESOURCE_FAIL",
        meta: { endpoint, status: response.status },
        payload: {},
      });
    });
