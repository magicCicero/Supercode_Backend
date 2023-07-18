import express from "express";
import "./models/index.js";
import { Post } from "./models/PostModel.js";

const app = express();
const PORT = 3001;

app.use(express.json());

// const addPost = async (post) => {
//   const newPost = new Post(post);
//   const response = await newPost.save();
//   console.log(response);
// };

// addPost({
//   title: "Hello World",
//   content: "This is a post",
//   author: "Alpay",
//   date: new Date(),
// });
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
  console.log(posts);
});

app.post("/api/addPost", async (req, res) => {
  const response = await Post.create(req.body);
  res.json(response);
  console.log(response);
});

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
