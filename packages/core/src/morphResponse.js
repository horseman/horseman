import headersToObject from "./headersToObject";

export default response => ({
  url: response.url,
  status: response.status,
  headers: headersToObject(response.headers),
});
