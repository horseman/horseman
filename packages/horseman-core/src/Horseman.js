/**
 * Class to register all ActionFactory calls. Used primarially for SSR
 */
class Horseman {
  constructor() {
    this.resources = new Map();
  }

  /*
   * Add a resource to the internal resources map, resources are expected
   * to be in the format
   *
   * ```
   * {
   *  endpoint: "foo",
   *  action: "actionName",
   * }
   * ```
   *
   * @param {Object} r
   *
   * @throws {Error} throws if the resource object does not have the correct
   *                 format
   *
   * @return {Map}
   */
  addResource(r) {
    const { endpoint, action } = r;
    if (!endpoint || !action) {
      throw new Error(`Unknown resource added to horseman`);
    }

    this.resources.set(r.endpoint, r);
  }

  /**
   * Return the underlying resources map
   *
   * @return {Map}
   */
  getAllResources() {
    return this.resources;
  }

  /**
   * check if the resources map contains an entry for a particular endpoint
   *
   * @param {string} endpoint
   *
   * @return {bool}
   */
  hasResource(endpoint) {
    return this.resources.has(endpoint);
  }

  /**
   * Clear all resources from the internal map
   *
   * @return {undefined}
   */
  clearResources() {
    return this.resources.clear();
  }
}

const singleton = new Horseman();

export default singleton;
