const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  likes: {
    type: [
      {
        userId: {
          type: String,
          required: [true, "User ID is required"],
        },
      },
    ],
    default: [],
  },
  disLikes: {
    type: [
      {
        userId: {
          type: String,
          required: [true, "User ID is required"],
        },
      },
    ],
    default: [],
  },
  comments: {
    type: [
      {
        userId: {
          type: String,
          required: [true, "User ID is required"],
        },
        description: {
          type: String,
          required: [true, "Description is required"],
        },
      },
    ],
    default: [],
  },
});
module.exports = mongoose.model("Blog", blogSchema);
