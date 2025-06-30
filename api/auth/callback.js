const express = require("express");
const passport = require("passport");
require("../_passport"); // Load the shared passport config
const serverless = require("serverless-http");

const app = express();

app.use(passport.initialize());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Auth callback route
app.get(
  "/",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  },
);

// Optional: route to test if this function is deployed
app.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = app;
module.exports.handler = serverless(app);
