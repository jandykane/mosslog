const express = require("express");
const passport = require("passport");
require("./_passport"); // Load strategy config
const serverless = require("serverless-http");

const app = express();
app.use(passport.initialize());

app.get(
  "/api/auth-callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  },
);

module.exports = app;
module.exports.handler = serverless(app);
