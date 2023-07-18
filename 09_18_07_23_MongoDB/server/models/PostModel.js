import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  content: String,
  author: String,
});

export const Post = mongoose.model("Post", postSchema);
