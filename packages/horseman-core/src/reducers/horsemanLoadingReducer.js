const initialState = {};

export default function loadingStatus(state = initialState, action) {
  switch (action.type) {
    case "@@horseman/PAGE_LOADING": {
      return {
        [action.keyName]: {
          loading: true,
          loaded: false,
        },
      };
    }

    case "@@horseman/PAGE_LOADED": {
      return {
        [action.keyName]: {
          loading: false,
          loaded: true,
        },
      };
    }

    default: {
      return state;
    }
  }
}
