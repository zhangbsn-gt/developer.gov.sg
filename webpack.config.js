const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        "vue-article-editor-app": "./src/vue-article-editor-app.js",
        "vue-terms-app": "./src/vue-terms-app.js",
        "vue-review-app": "./src/vue-review-app.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "assets/bundles")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                loader: "url-loader",
                options: {
                    limit: 8192
                }
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
