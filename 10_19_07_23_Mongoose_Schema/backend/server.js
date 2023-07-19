import express from "express";
import "./models/index.js";
import cors from "cors";
import { Post } from "./models/PostModel.js";
import { Author } from "./models/AuthorModel.js";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

//# Fetche alle Posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
    console.log(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//# Fetche alle Authoren
app.get("/api/authors", async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
    console.log(authors);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// # Fetche einen Post mit der ID
app.get("/api/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.send(post);
    console.log(post);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// # Fetche alle Posts eines Authors mit der ID des Authors
app.get("/api/getPostsByAuthor/:authorId", async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.authorId });
    res.send(posts);
    console.log(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// # Poste einen neuen Post
app.post("/api/addPost", async (req, res) => {
  try {
    const author = await Author.findById(req.body.author);

    if (author === null) {
      return res.send("Author is invalid");
    }

    const response = await Post.create(req.body);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

// # Poste einen neuen Author
app.post("/api/newAuthor", async (req, res) => {
  try {
    const response = await Author.create(req.body);
    res.json(response);
    console.log(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

// # Update einen Post mit der ID
app.put("/api/updatePost/:id", async (req, res) => {
  try {
    const response = await Post.findByIdAndUpdate(req.params.id, req.body).then(
      (response) => {
        res.json(response);
        console.log(response);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

// # Update einen Author mit der ID
app.put("/api/updateAuthor/:id", async (req, res) => {
  try {
    const response = await Author.findByIdAndUpdate(req.params.id, req.body);
    res.json(response);
    console.log(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

// # Lösche einen Post mit der ID
app.delete("/api/deletePost/:id", async (req, res) => {
  try {
    const response = await Post.findByIdAndDelete(req.params.id);
    res.json(response);
    console.log(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

// # Lösche einen Author mit der ID
app.delete("/api/deleteAuthor/:id", async (req, res) => {
  try {
    const response = await Author.findByIdAndDelete(req.params.id);
    res.json(response);
    console.log(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

// # Startet den Server mit dem jeweiligen PORT
app.listen(PORT, () => {
  console.log("Server läuft auf Port: " + PORT);
});
