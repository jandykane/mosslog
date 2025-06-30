const express = require("express");
const passport = require("passport");
require("./_passport");
const serverless = require("serverless-http");

const app = express();

app.use(passport.initialize());

app.get(
  "/",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  }),
);

exports.default = serverless(app);
