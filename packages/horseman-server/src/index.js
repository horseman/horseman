#!/usr/bin/env node
import express from 'express';
import path from 'path';
import fs from 'fs';
import compression from 'compression';


const runServer = ({ render, template, publicPath, rootDiv }) => {
  const app = express();
  const templateHtml = fs.readFileSync(template,"utf8");

  app.use(compression());
  app.use(express.static(publicPath));

  app.get('*', (req, res) => (
    render(req.path).then((response) => (
      res
      .status(response.statusCode || 200)
      .send(templateHtml.replace(rootDiv, response.html))
      )
    )
  ));

  const server = app.listen(80, () => {
    const { address, port } = server.address();
    console.log(`Listening at http://${address}:${port}`);
  });
};

const configPath = path.resolve(process.cwd(), "horseman.config.js");
/* eslint-disable */
const config = require(configPath)();
const serverConfig  = {
  ...config.server,
  render: require(config.server.backendBundle).default,
};
/* eslint-enable */

runServer(serverConfig);
