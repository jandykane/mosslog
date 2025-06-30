const express = require("express");
const serverless = require("serverless-http");

const app = express();

// This is a placeholder route for now
app.get("/", (req, res) => {
  res.json({
    message: "User route is active, but login session not implemented yet.",
  });
});

module.exports = serverless(app);
