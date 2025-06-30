const express = require("express");
const passport = require("passport");
require("../_passport");
const serverless = require("serverless-http");

const app = express();

// Minimal session-less setup
app.use(passport.initialize());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get(
  "/",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/"); // Success! Redirect to homepage
  },
);

exports.default = serverless(app);
