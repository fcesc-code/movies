const webpack = require("webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.sass$/,
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: () => [
              require("postcss-import"),
              require("tailwindcss"),
              require("autoprefixer"),
            ],
          },
        },
      },
    ],
  },
};
