import data from "./data.json" assert { type: "json" };
import fs from "node:fs";

const destructureJSON = () => {
  try {
    const reformattedArray = data.map((elm) => {
      return elm.id + " - " + elm.title + "\n" + elm.description + "\n";
    });

    const text = reformattedArray.join("\n");

    fs.writeFile("output.txt", text, (err) => {
      if (err) {
        throw err;
      }
      console.log("Data gespeichert in output.txt");
    });
  } catch (err) {
    console.error("Fehler beim Schreiben:", err);
  }
};

destructureJSON();
