import request from 'supertest';
import startServer from '../src/server';

const response = (statusCode = 200, html, url) => ({
  statusCode,
  data: {
    app: {
      html,
    },
  },
  url,
});

const render = path => new Promise((resolve) => {
  switch (path) {
    case '/':
      return resolve(response());
    case '/old':
      return resolve(response(301, 'Redirect', '/new'));
    case '/temp':
      return resolve(response(302, 'Redirect', '/permanent'));
    default:
      return resolve(response(404, 'Not Found'));
  }
});

describe('loading express', () => {
  const port = 3000;
  const server = startServer({ render, port });
  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('removes trailing slash', (done) => {
    request(server)
      .get('/slash/')
      .expect('location', '/slash')
      .expect(301, done);
  });
  it('301 permananet redirects', (done) => {
    request(server)
      .get('/old')
      .expect('location', '/new')
      .expect(301, done);
  });
  it('302 temp redirects', (done) => {
    request(server)
      .get('/temp')
      .expect('location', '/permanent')
      .expect(302, done);
  });
  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
