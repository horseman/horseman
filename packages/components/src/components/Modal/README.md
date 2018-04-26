The modal is a full screen take over of the page. A modal can have several
different types of content within it.

There is only intended to be a single modal on the page at a time, and triggered
via redux.

The open / closed state is manually set by the `handleClose` prop

## Installation

Add the modal reducers to your reducers object

```js
import { reducers } from "@horseman/components";

export default combineReducers({
  ...reducers.modal,
});
```

Connect the modal to your redux store

```js
/* ConnectedModal.js */
import { connect } from "react-redux";

import { Modal, actions } from "@horseman/components";

export const mapStateToProps = state => ({
  isOpen: state.modal.modalType !== null,
  type: state.modal.modalType,
  contentProps: state.modal.props,
});

export const mapDispatchToProps = dispatch => ({
  handleClose: () => {
    dispatch(actions.modal.hideModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
```

