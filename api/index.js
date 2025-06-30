const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require("path");
const serverless = require("serverless-http"); // 👈 Required for Vercel

require("dotenv").config();

const app = express();

// Serve static frontend files from /public (handled by Vercel, but useful for local dev)
app.use(express.static("public"));

// Session middleware
app.use(
  session({
    secret: "mosslogSecret",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/callback", // 👈 Note: /api/ prefix for Vercel
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Auth Routes
app.get("/api/auth", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/api/auth/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/"); // Will redirect to root on success
  }
);

// User route
app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
});

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
