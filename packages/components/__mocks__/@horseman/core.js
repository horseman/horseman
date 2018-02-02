/* eslint-disable no-underscore-dangle */

/**
 * Mock HorsemanCore so that we don't have to dep on it's dependencies.
 */
const Horseman = jest.fn();

const resources = new Map();

const inner = jest.fn();
const ActionFactory = jest.fn(() => inner);
const __getInner = () => inner;

ActionFactory.__getInner = __getInner;

Horseman.addResource = r => resources.set(r.endpoint, r);
Horseman.hasResource = jest.fn(e => resources.has(e));

export { ActionFactory };

export default Horseman;
