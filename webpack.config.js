const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { plugin } = require("typescript-eslint");
module.exports = {
  mode: "development",
  entry: "./src/Main/index.tsx",
  output: {
    path: path.join(__dirname, "public/js"),
    publicPath: "public/js",
    fileName: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", "scss"],
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  devServer: {
    contentBase: "./public",
    writeToDisk: true,
    historyApiFallback: true,
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [new CleanWebpackPlugin()],
};
