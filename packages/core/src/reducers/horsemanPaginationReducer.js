import * as types from "../constants/ActionTypes";

const initialState = {};

export default function paginations(state = initialState, action) {
  switch (action.type) {
    case types.SET_PAGE_TOTAL: {
      return {
        ...state,
        [action.handle]: {
          ...state[action.handle],
          totalPages: action.data.totalPages,
        },
      };
    }
    case types.SET_CURRENT_PAGE: {
      return {
        ...state,
        [action.handle]: {
          ...state[action.handle],
          currentPage: action.data.currentPage,
        },
      };
    }
    default: {
      return state;
    }
  }
}
