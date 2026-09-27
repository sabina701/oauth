const express = require("express");
const {
  createUser,
  loginTestUser,
  getCurrentUser,
} = require("../controllers/userController");
const router = express.Router();
router.post("/", createUser);
router.post("/test-login", loginTestUser);
router.get("/me", getCurrentUser);
module.exports = router;
