/* eslint-disable */
const execSync = require("child_process").execSync;
const rimraf = require("rimraf");

const rollup = require("rollup");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const babel = require("rollup-plugin-babel");

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

async function buildEs() {
  console.log("\nBuilding ES modules ...");

  exec(`./node_modules/.bin/babel ./src/ -d ./dist/es`, {
    BABEL_ENV: "es",
  });
}

async function buildCjs({ input, file }) {
  console.log(`\nBuilding CJS module ${input}...`);

  exec("babel src/ -d dist/cjs", {
    BABEL_ENV: "cjs",
  });
}

clearDist();
buildEs();

buildCjs({
  input: "src/index.js",
  file: "dist/cjs/index.js",
});
