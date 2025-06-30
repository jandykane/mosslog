const express = require("express");
const passport = require("passport");
require("./_passport");
const serverless = require("serverless-http");

const app = express();

app.use(passport.initialize());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get(
  "/api/auth",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

module.exports = app;
module.exports.handler = serverless(app);
