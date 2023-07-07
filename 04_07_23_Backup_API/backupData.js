import fs from "node:fs/promises";

// Pfade und Dateien werden in Variablen definiert
const dataDir = new URL(`./data`, import.meta.url);
const postsFile = new URL(`./data/posts.json`, import.meta.url);
const commentsFile = new URL(`./data/comments.json`, import.meta.url);
const combinedFile = new URL(`./data/combined.json`, import.meta.url);

const createBackup = async () => {
  // Es wird ein Data Ordner erstellt, wo die json Dateien gespeichert werden. Es wird nun geprüft, ob der Data Ordner vorliegt
  try {
    // Es wird überprüft, ob das Verzeichnis bereits existiert
    await fs.access(dataDir);
    console.log("Data Dir existed.");
  } catch (error) {
    // Existiert das Verzeichnis nicht, wird es erstellt
    try {
      await fs.mkdir(dataDir, { recursive: true });
      console.log("Data Dir created.");
    } catch (err) {
      console.error(err);
    }
  }
  // Variable mit leerem Array wird erstellt
  let fetchedPosts = [];
  // Lade Postsdaten von  der API
  await fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((res) => res.json(), console.log("Fetching Data..."))
    .then((data) => {
      console.log("Structuring Data");
      // data wird mithilfe von map destrukturiert und es werden die Eigenschaften aus jedem Eintrag des data Arrays und erstellt ein neues Objekt mit denselben Eigenschaften.
      fetchedPosts = data.map(({ id, title, body, userId }) => ({
        userId,
        id,
        title,
        body,
      }));
      console.log("Fetched Data");
    })
    .catch((error) => {
      console.error("Fehler beim Fetch", error);
    });
  // Die Posts.json wird geschrieben  und in dem definierten Pfad abgelegt. Es enthält die zuvor strukturierten Daten aus fetchedPosts. Dabei wird mit json.stringify die geladenen JS Objekte in einen JSON String umgewandelt.
  await fs.writeFile(postsFile, JSON.stringify(fetchedPosts, null, 5), {
    encoding: "utf8",
  });
  console.log("PostsFile Created");
  // Variable mit leerem Array wird erstellt
  let fetchedComments = [];
  // Lade Commentdaten von  der API
  await fetch(`https://jsonplaceholder.typicode.com/comments`)
    .then((res) => res.json(), console.log("Fetching Data..."))
    .then((data) => {
      console.log("Structuring Data");
      // data wird mithilfe von map destrukturiert und es werden die Eigenschaften aus jedem Eintrag des data Arrays und erstellt ein neues Objekt mit denselben Eigenschaften.
      fetchedComments = data.map(({ postId, id, name, email, body }) => ({
        postId,
        id,
        name,
        email,
        body,
      }));
      console.log("Fetched Data");
    })
    .catch((error) => {
      console.error("Fehler beim Fetch", error);
    });
  // Die Comments.json wird geschrieben und in dem definierten Pfad abgelegt. Es enthält die zuvor strukturierten Daten aus fetchedPosts. Dabei wird mit json.stringify die geladenen JS Objekte in einen JSON String umgewandelt.
  await fs.writeFile(commentsFile, JSON.stringify(fetchedComments, null, 5), {
    encoding: "utf8",
  });
  console.log("CommentsFile Created");
  // Nun werden die Daten aus der Variable nochmal durch eine Schleife geschoben, die erstmal zu jedem Post ein leeres comment Array initialisiert. Mithilfe der Filterfunktion wird nun die PostID aus der Comments.json und Posts.json verglichen und bei Übereinstimmung im leeren Array comments alle Kommentare hinzugefügt.
  fetchedPosts.forEach((post) => {
    post.comments = []; // Hier wird die Property comments des post Objekts als leeres Array initialisert und erstellt, damit im Anschluss die Comments hinzugefügt werden
    post.comments = fetchedComments.filter(
      (comment) => comment.postId === post.id
    );
  });

  // Die kombinierte Datei wird geschrieben und in dem definierten Pfad abgelegt.
  await fs.writeFile(combinedFile, JSON.stringify(fetchedPosts, null, 5), {
    encoding: "utf8",
  });
  console.log("Combined File Created");
};

export { createBackup };
