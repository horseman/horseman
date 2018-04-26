import * as types from "../constants/ActionTypes";

const initialState = {};

export default function resources(state = initialState, action) {
  switch (action.type) {
    case types.RESOURCE_REQUEST: {
      return {
        ...state,
        [action.meta.endpoint]: {
          meta: {
            loading: true,
            error: false,
          },
          data: {},
        },
      };
    }

    case types.ADD_RESOURCE: {
      return {
        ...state,
        [action.meta.endpoint]: {
          meta: {
            loading: false,
            error: false,
            status: action.meta.status,
          },
          data: action.payload,
          response: action.response,
        },
      };
    }

    case types.RESOURCE_FAIL: {
      return {
        ...state,
        [action.meta.endpoint]: {
          meta: {
            loading: false,
            error: true,
            status: action.meta.status,
          },
          data: {},
          response: action.response,
        },
      };
    }

    default: {
      return state;
    }
  }
}
