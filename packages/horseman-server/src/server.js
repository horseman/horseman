import compression from "compression";
import express from "express";
import path from "path";

import redirect from "./helpers/redirect";
import removeSlash from "./middleware/removeSlash";
import lowercase from "./middleware/lowercase";

const startServer = ({
  render,
  publicPath = path.join(__dirname, "./public"),
  viewDir = path.join(__dirname, "./views"),
  port = 80,
  basicAuth,
}) => {
  const app = express();

  app.use(compression());
  app.use(express.static(publicPath));
  app.set("view engine", "ejs");

  app.set("views", viewDir);

  app.use(removeSlash);
  app.use(lowercase);

  if (basicAuth) {
    app.locals = basicAuth;
    app.use(basicAuth);
  }

  app.get("*", (req, res) =>
    render(req.path).then(response => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return redirect(res, req, response.statusCode, response.url);
      }

      return res
        .status(response.statusCode || 200)
        .render("index", response.data);
    }),
  );

  const server = app.listen(port, () => {
    const { address, port: listeningPort } = server.address();
    /* eslint-disable no-console */
    console.log(`Listening at http://${address}:${listeningPort}`);
    /* eslint-enable */
  });
  return server;
};

export default startServer;
