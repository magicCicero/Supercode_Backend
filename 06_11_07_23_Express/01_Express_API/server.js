import express from "express";
import fs from "node:fs";

const app = express();
const PORT = 9898;
const posts = [];
const postsFile = new URL(`./posts.json`, import.meta.url);

app.use(express.json());

let fetchedLocalData = [];
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => {
    posts.push(...data);
    fs.writeFile(postsFile, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        console.error("Fehler beim Schreiben der JSON-Datei:", err);
      } else {
        console.log("JSON-Datei erfolgreich aktualisiert");
      }
    });
  })
  .catch((err) => console.log(err));
fetchedLocalData = fs.readFileSync(postsFile, { encoding: "utf-8" });

app.get("/status", (req, res) => {
  res.status(200).send("OK");
});
app.get("/posts", (req, res) => {
  res.send(fetchedLocalData);
});
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  res.send(post);
});

app.post("/post", (req, res) => {
  const data = fetchedLocalData;
  const jsonData = JSON.parse(data);
  jsonData.push(req.body);
  fs.writeFileSync("posts.json", JSON.stringify(jsonData, null, 2));
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log("Ich stehe vor der Tür mit der Nummer " + PORT);
});
