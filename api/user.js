const express = require("express");
const passport = require("passport");
require("./_passport");
const serverless = require("serverless-http");

const app = express();

app.use(passport.initialize());

app.get("/", (req, res) => res.status(401).json({ error: "Not implemented" }));

exports.default = serverless(app);
