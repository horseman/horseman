/* eslint-disable no-restricted-syntax */

/**
 * Given a Headers object, will return an object
 * representation of the keys: values
 *
 * @TODO: Figure out a way to get the syntax away from this procedural form and
 * remove the eslint-disable declaration above
 *
 * @param {Headers} headers
 * @returns {object}
 */
export default headers => {
  const headersObject = {};
  for (const h of headers) {
    const [key, value] = h;
    headersObject[key] = value;
  }

  return headersObject;
};
