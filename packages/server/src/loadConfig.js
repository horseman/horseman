/* eslint-disable import/no-dynamic-require */
import fs from "fs";
import path from "path";

const workingDirectory = path.resolve(process.cwd());
const defaults = {
  publicPath: path.join(workingDirectory, "public"),
  backendBundle: path.join(workingDirectory, "public", "backend.js"),
  auth: null,
  healthCheckPath: null,
};

// Check for horseman config
const configPath = path.join(workingDirectory, "horseman.config.js");

// Check for ejs views folder
const viewPath = path.join(workingDirectory, "views");

const viewDir = fs.existsSync(viewPath)
  ? viewPath
  : path.join(__dirname, "./views");
const userConfig = fs.existsSync(configPath)
  ? require(configPath)()
  : { server: {} };

const bundlePath = userConfig.server.backendBundle
  ? userConfig.server.backendBundle
  : defaults.backendBundle;

const config = {
  ...defaults,
  ...userConfig.server,
  render: require(bundlePath).default,
  viewDir,
};

export default config;
