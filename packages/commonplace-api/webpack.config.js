const path = require("path");

module.exports = {
  entry: "./index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
        // options: {
        //   // https://webpack.js.org/guides/build-performance/#typescript-loader
        //   transpileOnly: true,
        //   experimentalWatchApi: true,
        //   configFile: "tsconfig.server.json",
        // },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["node_modules"], // path.resolve(__dirname, "../modules") (?)
    alias: {
      graphql$: path.resolve(__dirname, "./node_modules/graphql/index.js"),
    },
  },
  target: "node",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
