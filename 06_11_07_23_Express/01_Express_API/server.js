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
    // Hier wird die Data Datei direkt lokal gespeichert, siehe Aufgabe 3
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

// Aufgabe 1: Endpunkt GET erstellt, der einen Response zurückgibt, wenn der user auf dem Pfad /status ist
app.get("/status", (req, res) => {
  res.status(200).send("OK");
});

// Aufgabe 2: die zurvor gefetchten Daten werden nun unter /posts verfügbar gemacht. Als Response erhält der User alle Posts als Json

app.get("/posts", (req, res) => {
  // Alle lokal gespeicherten Posts aus der json Datei werden als Response zurückgegeben
  res.send(fetchedLocalData);
});

// # Aufgabe 3: Der User hat nun die Möglichkeit, jeden Post unter einem dynamisch gesetzte URL aufzurufen.

app.get("/posts/:id", (req, res) => {
  // Die angefragte ID im Pfad wird als Number gespeichert
  const id = Number(req.params.id);
  // lokale Daten werden seperat in einer Variable gespeichert
  const data = fetchedLocalData;
  // Daten werden in eine JSON geparsed
  const jsonData = JSON.parse(data);
  // Es wird abgefragt, ob es sich um eine ID handelt

  if (isNaN(id)) {
    res.status(400).send("Invalid ID");
    return;
  }
  //Nun wird in lokale Datei nach der ID gesucht

  const post = jsonData.find((post) => post.id === id);

  // Wird kein Post gefunden, dann wird 404 zurückgegeben
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  res.send(post);
});

// # Aufgabe 4: Die geftechten Daten sind bereits lokal gespeichert. Die Endpunkte wurden bereits geändert, siehe Zeile 16

// # Aufgabe 5: Der User hat nun die Möglichkeit, selbst Daten zu posten. Als Response erhält der User die übermittelten Daten zurück
app.post("/post", (req, res) => {
  // lokale Daten werden seperat in einer Variable gespeichert
  const data = fetchedLocalData;
  // Daten werden in eine JSON geparsed
  const jsonData = JSON.parse(data);
  // Der Request-Body wird in die JSON gepushed
  jsonData.push(req.body);
  // Daten werden nun in der posts.json gespeichert, indem die ursprüngliche Datei überschrieben wird
  fs.writeFileSync("posts.json", JSON.stringify(jsonData, null, 2));
  // User erhält als Response die Request-Body zurück
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log("Ich stehe vor der Tür mit der Nummer " + PORT);
});
