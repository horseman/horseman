#!/usr/bin/env node
import express from "express";
import path from "path";
import fs from "fs";
import compression from "compression";

const runServer = ({ render, template, publicPath, rootDiv }) => {
  const app = express();
  const templateHtml = fs.readFileSync(template, "utf8");

  app.use(compression());
  app.use(express.static(publicPath));

  app.get("*", (req, res) =>
    render(req.path).then(response =>
      res
        .status(response.statusCode || 200)
        .send(templateHtml.replace(rootDiv, response.html)),
    ),
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
  template: path.join(workingDirectory, "public", "index.tmpl"),
  rootDiv: '<div id="root"></div>',
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
