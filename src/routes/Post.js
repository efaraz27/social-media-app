const express = require("express");
const multer = require("multer");
const {
  createPost,
  getTopPosts,
  getPost,
  getUserPosts,
  likePost,
  unlikePost,
  addComment,
} = require("../controllers/Post");
const { requireSignin, uploadS3 } = require("../middlewares");
const router = require("./Auth");
const path = require("path");
const shortid = require("shortid");

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
  "/posts/create",
  requireSignin,
  uploadS3.single("postImage"),
  createPost
);

router.post("/posts/getTopPosts", getTopPosts);

router.get("/posts/getPost", getPost);

router.get("/posts/getUserPosts", getUserPosts);

router.post("/posts/likePost", likePost);

router.post("/posts/unlikePost", unlikePost);

router.post("/posts/addComment", addComment);

module.exports = router;
