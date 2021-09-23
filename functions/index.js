require('../server/src/library/utility/env');
const express = require('express');
const serverless = require("serverless-http");
const app = express();
const bodyParser = require('body-parser');
const mainRouter = require('../routes');
// const logger = require('../src/library/utility/get-logger')(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(bodyParser.json());
app.use("/.netlify/functions/index/", mainRouter.userRouter);

module.exports.handler = serverless(app);