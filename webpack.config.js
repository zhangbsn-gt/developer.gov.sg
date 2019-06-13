const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const {
    VueLoaderPlugin
} = require("vue-loader");
module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        "vue-edit-product-app": "./src/vue-edit-product-app.js",
        "vue-terms-app": "./src/vue-terms-app.js",
        "sgds/sgds": "./src/importSgds.js" // output to sgds/sgds.bundle.js
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
                test: /sgds\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            },
            {
                test: /sgds-icons\.(svg|ttf|woff)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "sgds/fonts",
                            publicPath: "fonts"
                        }
                    }
                ]
            },
            {
                test: /(?<!sgds)\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /(?<!sgds-icons)\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                },
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};