import compression from "compression";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import redirect from "./helpers/redirect";
import removeSlash from "./middleware/removeSlash";
import lowercase from "./middleware/lowercase";
import basicAuth from "./middleware/basicAuth";
import healthCheck from "./middleware/healthCheck";
import geoMiddleware from "./middleware/geo";

const startServer = ({
  render,
  publicPath = path.join(__dirname, "./public"),
  viewDir = path.join(__dirname, "./views"),
  port = 80,
  auth,
  healthCheckPath,
  geoLookup,
}) => {
  const app = express();

  app.use(compression());
  app.use(express.static(publicPath));
  app.set("view engine", "ejs");
  app.use(cookieParser());

  app.set("views", viewDir);

  app.use(removeSlash);
  app.use(lowercase);

  // This must run before basic auth
  if (healthCheckPath) {
    app.locals.healthCheckPath = healthCheckPath;
    app.use(healthCheck);
  }

  if (geoLookup) {
    app.use(geoMiddleware);
    app.set('trust proxy',true);
  }

  if (auth) {
    app.locals.authentication = auth;
    app.use(basicAuth);
  }

  app.get("*", (req, res) =>
    render(req.path, req).then(response => {
      if (response.cookies && response.cookies.length > 0) {
        response.cookies.forEach(cookie => {
          console.log("cookie", cookie);
          res.cookie(cookie.name, cookie.value, cookie.options);
        });
      }
      if (response.statusCode === 301 || response.statusCode === 302) {
        return redirect(res, req, response.statusCode, response.url);
      }
      console.log("headers", res.headers);
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
