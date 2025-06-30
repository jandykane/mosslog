const express = require("express");
const passport = require("passport");
require("../_passport");
const serverless = require("serverless-http");

const app = express();

app.use(passport.initialize());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// ✅ This route must be "/"
app.get(
  "/",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  },
);

// Optional: ping test
app.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = app;
module.exports.handler = serverless(app);
