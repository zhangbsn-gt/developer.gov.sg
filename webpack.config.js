const path = require("path");
const {
    VueLoaderPlugin
} = require("vue-loader");
module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        "vue-edit-category-app": "./src/vue-edit-category-app.js",
        "vue-edit-product-app": "./src/vue-edit-product-app.js",
        "vue-terms-app": "./src/vue-terms-app.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "assets/js")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude:
                    /node_modules/
                ,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                },
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};