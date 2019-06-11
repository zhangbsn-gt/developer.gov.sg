const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const router = require("./router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/.netlify/functions/api", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);