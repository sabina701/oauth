const express = require("express");
const passport = require("passport");

const router = express.Router();
// Step 1: Start Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);
// Step 2: Google sends the user back here
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res, next) => {
    req.login(req.user, (error) => {
      if (error) {
        return next(error);
      }

      res.json({
        message: "Google login successful",
        user: req.user,
      });
    });
  },
);
// Check logged-in user
router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "Not logged in",
    });
  }

  res.json({
    message: "You are logged in",
    user: req.user,
  });
});

//Logout
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.json({
      message: "Logout successful",
    });
  });
});
module.exports = router;
