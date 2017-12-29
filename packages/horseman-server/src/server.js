import compression from 'compression';
import express from 'express';
import path from 'path';

import removeSlash from './middleware/removeSlash';

const startServer = ({
    render,
    publicPath = path.join(__dirname, './public'),
    viewPath = path.join(__dirname, './views'),
    port = 80,
  }) => {
  const app = express();

  app.use(compression());
  app.use(express.static(publicPath));
  app.set('view engine', 'ejs');

  app.set('views', viewPath);

  app.use(removeSlash);

  app.get('*', (req, res) => (
    render(req.path).then((response) => {
      if (response.statusCode === 301
        || response.statusCode === 302) {
        return res.redirect(response.statusCode, response.url);
      }

      return res
        .status(response.statusCode || 200)
        .render('index', response.data);
    })
  ));

  const server = app.listen(port, () => {
    const { address, port } = server.address();
    /* eslint-disable-next-line no-console */
    console.log(`Listening at http://${address}:${port}`);
  });
  return server;
};

export default startServer;
