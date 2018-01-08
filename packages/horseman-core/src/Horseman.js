/**
 * Class to register all ActionFactory calls. Used primarially for SSR
 */
class Horseman {
  constructor() {
    this.resources = new Set();
  }

  addResource(r) {
    this.resources.add(r);
  }

  getAllResources() {
    return this.resources;
  }
}

const singleton = new Horseman();

export default singleton;
