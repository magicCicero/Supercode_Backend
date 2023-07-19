import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  content: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    immutable: true,
  },
});

export const Post = mongoose.model("Post", postsSchema);
