const express = require("express");
const passport = require("passport");
require("../_passport"); // adjust path for parent folder
const serverless = require("serverless-http");

const app = express();

app.use(passport.initialize());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get(
  "/",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  },
);

module.exports = app;
module.exports.handler = serverless(app);
