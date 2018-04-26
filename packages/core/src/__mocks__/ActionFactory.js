const inner = jest.fn();

const ActionFactory = jest.fn(() => inner);

export default ActionFactory;
