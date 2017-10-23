import express from 'express';
import compression from 'compression';

export default ({ render, template, publicPath, rootDiv }) => {
  const app = express();

  app.use(compression());
  app.use(express.static(publicPath));

  app.get('*', (req, res) => (
    render(req.path).then((response) => (
      res
      .status(response.statusCode || 200)
      .send(template.replace(rootDiv, response.html))
      )
    )
  ));

  const server = app.listen(80, () => {
    const { address, port } = server.address();
    console.log(`Listening at http://${address}:${port}`);
  });
};
