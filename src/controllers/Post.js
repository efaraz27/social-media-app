const Post = require("../models/Post");
const User = require("../models/User");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

exports.createPost = (req, res) => {
  const { description, createdById, createdByName, createdByPicture } =
    req.body;
  const _post = new Post({
    description: description,
    file: req.file.location,
    likes: [],
    comments: [],
    createdById: createdById,
    createdByName: createdByName,
    createdByPicture: createdByPicture,
  });
  _post.save((error, post) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    if (post) return res.status(201).json({ post });
  });
};

exports.getTopPosts = (req, res) => {
  Post.find()
    .sort({ _id: -1 })
    .limit(10)
    .exec(async (error, posts) => {
      if (posts) return res.status(200).json({ posts });
      else res.status(400).json({ error });
    });
};

exports.getUserPosts = (req, res) => {
  User.findOne({ _id: req.query.id }).exec(async (error, user) => {
    if (user) {
      if (error) return res.status(400).json({ error });
      Post.find({ createdById: req.query.id })
        .sort({ _id: -1 })
        .exec(async (error, posts) => {
          if (error) res.status(400).json({ error });
          else return res.status(200).json({ user, posts });
        });
    }
  });
};

exports.getPost = (req, res) => {
  Post.find({ _id: req.query.id }).exec(async (error, post) => {
    if (post) return res.status(200).json({ post });
    else res.status(400).json({ error });
  });
};

exports.uploadImage = (req, res, next) => {
  upload.single("postImage")(req, res, function (error) {
    if (error) {
      console.log(`upload.single error: ${error}`);
      return res.sendStatus(500);
    }
    next();
  });
};

exports.likePost = (req, res) => {
  Post.findOne({ _id: req.body.id }).exec(async (error, post) => {
    if (post) {
      const query = { _id: req.body.id };
      if (!post.likes.includes({ _id: req.body.userId }))
        post.likes.push(req.body.userId);
      console.log(post);
      const update = { likes: post.likes };
      Post.findOneAndUpdate(
        query,
        update,
        { upsert: true },
        function (err, doc) {
          if (err) {
            console.log(err);
            return res.status(400).json({ err });
          }
          return res.status(201).json({ post });
        }
      );
    }
  });
};

exports.unlikePost = (req, res) => {
  Post.findOne({ _id: req.body.id }).exec(async (error, post) => {
    if (post) {
      const query = { _id: req.body.id };
      newLikes = post.likes.filter(function (value, index, arr) {
        return value._id != req.body.userId;
      });
      const update = { likes: newLikes };
      Post.findOneAndUpdate(
        query,
        update,
        { upsert: true },
        function (err, doc) {
          if (err) return res.status(400).json({ error });
          return res.status(201).json({ post });
        }
      );
    }
  });
};

exports.addComment = (req, res) => {
  console.log("Request recieved");
  Post.findOne({ _id: req.body.id }).exec(async (error, post) => {
    console.log(post);
    if (post) {
      const query = { _id: req.body.id };
      newComments = [...post.comments];
      newComments.push({
        commentData: req.body.commentData,
        createdById: req.body.createdById,
        createdByName: req.body.createdByName,
        createdByPicture: req.body.createdByPicture,
      });
      console.log(newComments);
      const update = { comments: newComments };
      Post.findOneAndUpdate(
        query,
        update,
        { upsert: true, new: true },
        function (err, doc) {
          if (err) return res.status(400).json({ error });
          const newDocument = doc;
          return res.status(201).json({ newDocument });
        }
      );
    }
  });
};
