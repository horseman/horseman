/* eslint-disable no-restricted-syntax */

const legacy = headers => {
  const headersObject = {};

  Object.keys(headers["_headers"]).forEach(key => {
    headersObject[key] = headers.get(key);
  });

  return headersObject;
};

const current = headers => {
  const headersObject = {};
  for (const h of headers) {
    const [key, value] = h;
    headersObject[key] = value;
  }

  return headersObject;
};
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
export default headers =>
  typeof headers[Symbol.iterator] === "function"
    ? current(headers)
    : legacy(headers);
