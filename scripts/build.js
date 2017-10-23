/* eslint-disable */
const execSync = require("child_process").execSync;
const rimraf = require("rimraf");

const packages = ["horseman-components"];

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: "inherit",
    env: Object.assign({}, process.env, extraEnv),
  });

const clearDist = p => {
  console.log("\nCleaning ...");
  try {
    rimraf.sync(`packages/${p}/dist`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const buildEs = p => {
  console.log("\nBuilding ES modules ...");

  exec(`babel packages/${p}/src/ -d packages/${p}/dist/es`, {
    BABEL_ENV: "es",
  });
};

packages.forEach(p => {
  clearDist(p);
  buildEs(p);
});
