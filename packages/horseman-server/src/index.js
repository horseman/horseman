#!/usr/bin/env node
import express from "express";
import path from "path";
import compression from "compression";

const runServer = ({ render, publicPath }) => {
  const app = express();

  app.use(compression());
  app.use(express.static(publicPath));
  app.set('view engine', 'ejs')

  app.get("*", (req, res) =>
    render(req.path).then(response => {

      if(response.statusCode === "301" || response.statusCode === "302"){
        return res.redirect(response.statusCode, response.url);
      }

      return res
        .status(response.statusCode || 200)
        .render("index",response.data);
    })
  );

  const server = app.listen(80, () => {
    const { address, port } = server.address();
    /* eslint-disable-next-line no-console */
    console.log(`Listening at http://${address}:${port}`);
  });
};

const workingDirectory = path.resolve(process.cwd());
const configPath = path.join(workingDirectory, "horseman.config.js");
/* eslint-disable */
const config = require(configPath)();
const defaults = {
  publicPath: path.join(workingDirectory, "public"),
  backendBundle: path.join(workingDirectory, "public", "backend.js"),
};
const bundlePath = config.server.backendBundle
  ? config.server.backendBundle
  : defaults.backendBundle;
const serverConfig = {
  ...defaults,
  ...config.server,
  render: require(bundlePath).default,
};
/* eslint-enable */

runServer(serverConfig);
