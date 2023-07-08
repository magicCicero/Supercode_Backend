import fs from "node:fs";

// # Schritt 1
const newContentOne = "Ich bin Webdeveloper";

fs.writeFile("./blog1.txt", newContentOne, (err) => {
  if (err) {
    console.error("Fehler beim Schreiben der Datei:", err);
    return;
  }

  console.log("Content ersetzt");
});

// # Schritt 2

const newContentTwo = "Content ist super";
fs.writeFile("./blog2.txt", newContentTwo, (err) => {
  if (err) {
    console.error("Fehler beim Schreiben der Datei:", err);
    return;
  }

  console.log("Neue Blogdatei erstellt");
});

// # Schritt 3

if (fs.existsSync("./assets")) {
  fs.rmdir("assets", () => {
    console.log("Assets Ordner gelöscht");
  });
} else {
  console.log("Assets Ordner existiert nicht");
}

// # Schritt 4

fs.mkdir();
