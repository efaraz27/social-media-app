const express = require("express");
const { getUser } = require("../controllers/User");
const router = express.Router();

router.post("/getUser", getUser);

module.exports = router;
