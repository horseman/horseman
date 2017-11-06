export const openModal = (modalType, props) => ({
  modalType,
  props,
  type: "@@horseman/showModal",
});

export const hideModal = () => ({
  type: "@@horseman/hideModal",
});
