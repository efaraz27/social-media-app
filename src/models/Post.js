const mongoose = require("mongoose");
const User = require("./User");
const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    file: {
      type: String,
      required: true,
    },
    likes: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    comments: [],
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdByName: {
      type: String,
      required: true,
      trim: true,
    },
    createdByPicture: {
      type: String,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
