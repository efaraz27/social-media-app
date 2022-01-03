const express = require("express");
const { signup, signin, isExpired } = require("../controllers/Auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/Auth");
const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/isSignedIn", isExpired);

module.exports = router;
