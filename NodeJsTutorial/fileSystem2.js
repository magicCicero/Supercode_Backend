let fs = require("fs");

fs.mkdir(
  "C:/Users/alpay/OneDrive/Supercode/Visual Code Ordner/03_SuperCode_Backend/NodeJsTutorial/Output/.txt",
  dirCreated
);

function dirCreated() {
  console.log("ordner erstellt");
}
