import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";

const Modal = ({
  isOpen,
  mappings,
  type,
  contentProps,
  handleClose,
  closeButton,
}) => {
  const ContentComponent = mappings[type];
  const CloseComponent = closeButton;
  const content = type ? <ContentComponent {...contentProps} /> : null;
  return (
    <ReactModal
      shouldCloseOnOverlayClick
      contentLabel="Modal"
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={{
        overlay: {
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, .9)",
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        },
        content: {
          border: "none",
          borderRadius: "0",
          maxWidth: "900px",
          position: "static",
          width: "90%",
          zIndex: "3",
        },
      }}
    >
      {content}
      <CloseComponent onClick={handleClose} />
    </ReactModal>
  );
};

Modal.defaultProps = {
  isOpen: false,
  type: null,
};

Modal.propTypes = {
  /**
   * Determine whether or not to show the modal
   */
  isOpen: PropTypes.bool,

  /**
   * What happens when the 'x' button is clicked.
   */
  handleClose: PropTypes.func.isRequired,

  /**
   * Will determine the type of content that is rendered within the modal
   * itself.
   */
  type: PropTypes.string,

  /**
   * Props which will be passed to the underlying modal content component
   */
  contentProps: PropTypes.object,

  /**
   * Mapping of string type to the type of component that will be rendered
   */
  mappings: PropTypes.object.isRequired,

  /**
   * The component to be rendered in the close button spot
   */
  closeButton: PropTypes.node.isRequired,
};

export default Modal;
