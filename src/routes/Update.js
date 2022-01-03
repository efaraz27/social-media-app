const express = require("express");
const { updateUser } = require("../controllers/Update");
const router = express.Router();
const { requireSignin, uploadS3 } = require("../middlewares");

// const multer = require("multer");
// const path = require("path");
// const shortid = require("shortid");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

router.post(
  "/updateUser",
  requireSignin,
  uploadS3.single("profilePicture"),
  updateUser
);

module.exports = router;
