"use strict";

const webpack = require("webpack");

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  // WARNING: MUST set the 'mode' manually because it isn't done by NX/NG cli
  mode,
  module: {
    rules: [
      // add custom rules here
    ],
  },
  plugins: [
    // add custom plugins here
  ],
};
