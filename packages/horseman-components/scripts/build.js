/* eslint-disable */
const execSync = require("child_process").execSync;
const rimraf = require("rimraf");

const packages = ["horseman-components"];

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: "inherit",
    env: Object.assign({}, process.env, extraEnv),
  });

const clearDist = () => {
  console.log("\nCleaning ...");
  try {
    rimraf.sync(`./dist`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const buildEs = () => {
  console.log("\nBuilding ES modules ...");

  exec(`babel ./src/ -d ./dist/es`, {
    BABEL_ENV: "es",
  });
};

clearDist();
buildEs();
