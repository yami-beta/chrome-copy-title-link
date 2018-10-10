const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const { mode } = argv;

  return {
    mode,
    entry: {
      index: [path.join(__dirname, "src", "index.ts")]
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js"
    },
    resolve: {
      extensions: [".js", ".ts"]
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          use: ["ts-loader"],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html")
      }),
      new CopyWebpackPlugin([
        {
          from: "src/manifest.json",
          to: "./"
        },
        {
          from: "src/icon.png",
          to: "./"
        }
      ])
    ],
    devtool: mode === "development" ? "inline-source-map" : false
  };
};
