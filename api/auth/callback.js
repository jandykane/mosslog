const express = require("express");
const passport = require("passport");
require("../_passport");
const serverless = require("serverless-http");

const app = express();

app.use(passport.initialize());

app.get(
  "/",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/?auth=fail",
  }),
  (req, res) => {
    console.log("✅ Callback triggered:", req.user);
    res.redirect("/?auth=success");
  },
);

// Optional: test route to verify deployment
app.get("/ping", (req, res) => res.send("pong"));

module.exports = serverless(app);
