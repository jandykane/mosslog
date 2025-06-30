const express = require("express");
const passport = require("passport");
require("./_passport");
const serverless = require("serverless-http");

const app = express();
app.use(passport.initialize());

app.get("/api/user", (req, res) => {
  res.json({ message: "stubbed user info for now" });
});

module.exports = app;
module.exports.handler = serverless(app);
