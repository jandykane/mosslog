const express = require("express");
const passport = require("passport");
require("../_passport");
const serverless = require("serverless-http");

const app = express();

app.use(passport.initialize());

// Minimal Passport config, no session
app.get(
  "/",
  (req, res, next) => {
    console.log("🔁 Handling Google callback...");
    next();
  },
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/?error=google_auth_failed",
  }),
  (req, res) => {
    console.log("✅ Google authenticated user:", req.user);
    res.redirect("/?success=true");
  },
);

// Optional ping route
app.get("/ping", (req, res) => {
  res.send("pong");
});

exports.default = serverless(app);
