let fs = require("fs");

fs.mkdir("Testordner", dirCreated);

function dirCreated() {
  console.log(" Ordner fertig erstellt");

  fs.appendFile("test.txt", "Hallo Alpay", fileCreated);
}

function fileCreated() {
  console.log("Datei in Ordner erstellt");
}
