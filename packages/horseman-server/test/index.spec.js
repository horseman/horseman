import request from "supertest";
import startServer from "../src/server";

const response = (statusCode = 200, html, url) => ({
  statusCode,
  data: {
    app: {
      html,
    },
  },
  url,
});

const render = path =>
  new Promise(resolve => {
    switch (path) {
      case "/":
        return resolve(response());
      case "/old":
        return resolve(response(301, "Redirect", "/new"));
      case "/temp":
        return resolve(response(302, "Redirect", "/permanent"));
      default:
        return resolve(response(404, "Not Found"));
    }
  });

describe("loading express", () => {
  let server;
  const port = 3000;
  beforeEach(() => {
    server = startServer({ render, port });
  });
  afterEach(done => {
    server.close(done);
  });
  it("responds to /", done => {
    request(server)
      .get("/")
      .expect(200, done);
  });
  it("removes trailing slash", done => {
    request(server)
      .get("/slash/")
      .expect("location", "/slash")
      .expect(301, done);
  });
  it("301 permananet redirects", done => {
    request(server)
      .get("/old")
      .expect("location", "/new")
      .expect(301, done);
  });
  it("redirects to remove uppercase letters", done => {
    request(server)
      .get("/Old")
      .expect("location", "/old")
      .expect(301, done);
  });
  it("keeps query strings when redirecting with slash", done => {
    request(server)
      .get("/slash/?foo=bar")
      .expect("location", "/slash?foo=bar")
      .expect(301, done);
  });
  it("keeps query strings when redirecting", done => {
    request(server)
      .get("/old?foo=bar")
      .expect("location", "/new?foo=bar")
      .expect(301, done);
  });
  it("302 temp redirects", done => {
    request(server)
      .get("/temp")
      .expect("location", "/permanent")
      .expect(302, done);
  });
  it("404 everything else", done => {
    request(server)
      .get("/foo/bar")
      .expect(404, done);
  });
});
describe("basic auth", () => {
  let server;
  const port = 3000;
  const healthCheckPath = "/status";
  const auth = {
    accounts: [
      {
        name: "foo",
        pass: "bar",
      },
    ],
  };
  beforeEach(() => {
    server = startServer({ render, port, auth, healthCheckPath });
  });
  afterEach(done => {
    server.close(done);
  });
  it("doesn't allow unauthorized requests", done => {
    request(server)
      .get("/")
      .expect(401, done);
  });
  it("allows unauthorized health checks", done => {
    request(server)
      .get("/status")
      .expect(200, done);
  });
  it("doesn't allow poorly authorized requests", done => {
    request(server)
      .get("/")
      .auth("bad", "pass")
      .expect(401, done);
  });
  it("does allow authorized requests", done => {
    request(server)
      .get("/")
      .auth("foo", "bar")
      .expect(200, done);
  });
});
