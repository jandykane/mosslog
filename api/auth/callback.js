const express = require("express");
const passport = require("passport");
require("../_passport");
const serverless = require("serverless-http");

const app = express();

app.use(passport.initialize());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get(
  "/",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/?auth=fail",
  }),
  (req, res) => {
    console.log("✅ Callback success:", req.user);
    res.redirect("/?auth=success");
  },
);

app.get("/ping", (req, res) => {
  res.send("pong");
});

exports.default = serverless(app);
