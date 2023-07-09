import fs from "node:fs";
const dataURL = new URL("./data", import.meta.url);
const dataTxt = new URL("./data/data.txt", import.meta.url);
const content = "Hello World";

const createDirandTxt = async () => {
  try {
    await fs.promises.access(dataURL, fs.constants.R_OK);
    console.log(" Directory exists");
    await fs.promises.access(dataTxt);
    console.log("TxtFile exists");
  } catch (err) {
    console.log("Directory does not exists. Creating directory and txtFile");
    fs.mkdirSync(dataURL, { recursive: true });
    fs.writeFile(dataTxt, content, function (err) {
      if (err) throw err;
      console.log("TxtFile created");
    });
  }
};

export { createDirandTxt };
