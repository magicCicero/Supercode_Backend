import fs from "node:fs";
const dataURL = new URL("./data", import.meta.url);
const dataTxt = new URL("./data/data.txt", import.meta.url);
const content = "Hello World";

const readDirectory = async () => {
  if (fs.existsSync(dataURL)) {
    console.log("Directory exists");
    createTxtFile();
  } else {
    fs.mkdirSync(dataURL, { recursive: true });
    console.log("Directory does not exists. Creating directory");
    createTxtFile();
  }
};

const createTxtFile = async () => {
  if (fs.existsSync(dataTxt)) {
    console.log("TxtFile exists");
  } else {
    fs.writeFile(dataTxt, content, function (err) {
      if (err) throw err;
      console.log("TxtFile created");
    });
    console.log("TxtFile does not exists. Creating TxtFile");
  }
};

readDirectory();
