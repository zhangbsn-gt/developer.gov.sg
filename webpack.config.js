const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = (env, argv) => {
  const config = {
    mode: "development", // Use cli args for prod
    entry: {
      "vue-article-editor-app": "./apps/src/articles/vue-article-editor-app.js",
      "vue-terms-app": "./apps/src/terms/vue-terms-app.js",
      "vue-events-app": "./apps/src/events/vue-events-app.js",
      "vue-workflow-app": "./apps/src/workflows/vue-workflow-app.js",
      "vue-add-page-app": "./apps/src/pages/vue-add-page-app.js",
      "vue-search-app-full-site":
        "./apps/src/search/vue-search-app-full-site.js",
      "vue-search-app-all-products":
        "./apps/src/search/vue-search-app-all-products.js",
      "vue-blogs-app": "./apps/src/blogs/vue-blogs-app.js",
      "vue-search-app-all-events":
        "./apps/src/search/vue-search-app-all-events.js",
      "community-overview": "./apps/src/communities/community-overview.js",
      "conferences-webinars-sort":
        "./apps/src/communities/conferences-webinars-sort.js",
      "layout-page-sidenav-calendar":
        "./apps/src/communities/layout-page-sidenav-calendar.js",
      "toggle-accordion": "./apps/src/communities/toggle-accordion.js",
      "main": "./apps/src/main.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "assets/bundles"),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
          type: "asset/resource",
        },
        {
          test: /\.vue$/,
          use: "vue-loader",
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin(),
      new Dotenv(), // Dotenv must come before EnvironmentPlugin
      new webpack.EnvironmentPlugin({
        BRANCH: null,
        API_URL:
          argv.mode === "production"
            ? "https://api.developer.gov.sg/v1/api"
            : process.env.API_URL
            ? process.env.API_URL
            : "http://localhost:4001/dummy-api-url",
      }),
    ],
    devtool: "source-map",
    
  };

  return config;
};
