/**
 * ParseEndpoint handles templating out react-router formatted url's with a
 * map of keys => values.
 *
 * @param endpoint {string} the react formatted endpoint.
 * @param options {object} The key: value pairs that will be templated into the
 *        endpoint.
 */
const ParseEndpoint = (endpoint, options) => {
  const params = endpoint.match(/:[a-z0-9]+/g);
  let parsedEndpoint = endpoint;

  if (!params) {
    return endpoint;
  }

  params.forEach(param => {
    const cleanParam = param.replace(":", "");
    parsedEndpoint = parsedEndpoint.replace(param, options[cleanParam] || "");
  });

  return parsedEndpoint;
};

export default ParseEndpoint;
