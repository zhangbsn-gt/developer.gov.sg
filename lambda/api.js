const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const cookieParser = require('cookie-parser');
const router = require("./app/router");
const config = require("./app/config");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use("/.netlify/functions/api", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
