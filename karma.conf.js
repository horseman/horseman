/* eslint-disable */

// karma.conf.js
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");

module.exports = function(config) {
  config.set({
    client: {
      args: parseTestPattern(process.argv),
    },
    failOnEmptyTestSuite: false,
    browsers: ["PhantomJS"],
    frameworks: ["mocha"],
    files: [
      {
        pattern: "./src/**/*.js*",
        watched: true,
        included: false,
        served: false,
      },
      "node_modules/babel-polyfill/dist/polyfill.js",
      "setupTest.js",
    ],
    preprocessors: {
      "setupTest.js": ["webpack", "sourcemap"],
    },
    reporters: ["mocha"],
    webpack: Object.assign(webpackConfig, {
      externals: {},
      plugins: [
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("test"),
        }),
      ],
    }),
    webpackMiddleware: {
      stats: "errors-only",
    },
    webpackServer: {
      noInfo: true,
    },
  });
};

function parseTestPattern(argv) {
  var found = false;
  var pattern = argv
    .map(function(v) {
      if (found) {
        return v;
      }
      if (v === "--") {
        found = true;
      }
    })
    .filter(function(a) {
      return a;
    })
    .join(" ");
  return pattern ? ["--grep", pattern] : [];
}
