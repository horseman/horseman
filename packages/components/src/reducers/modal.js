const initialState = {
  modalType: null,
  modalProps: {},
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case "@@horseman/showModal": {
      return {
        modalType: action.modalType,
        props: { ...action.props },
      };
    }

    case "@@horseman/hideModal": {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
