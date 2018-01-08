import * as types from "../constants/ActionTypes";

const initialState = {};

export default function routes(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_ROUTES: {
      return action.routes;
    }

    default: {
      return state;
    }
  }
}
