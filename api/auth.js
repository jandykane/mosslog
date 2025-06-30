const express = require("express");
const passport = require("passport");
require("./_passport"); // Load strategy config
const serverless = require("serverless-http");

const app = express();
app.use(passport.initialize());

app.get(
  "/api/auth",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

module.exports = app;
module.exports.handler = serverless(app);
