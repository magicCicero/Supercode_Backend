import express from "express";
import dotenv from "dotenv";
import data from "./data.json" assert { type: "json" };

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

const PORT = process.env.PORT || 3000;
const app = express();

const ReactAppDistPath = new URL("../frontend/dist/", import.meta.url);
const ReactAppIndex = new URL("../frontend/dist/index.html", import.meta.url);

app.use(express.json());
app.use(express.static(ReactAppDistPath.pathname));
/*
 * express.static matched auf jede Datei im angegebenen Ordner
 * und erstellt uns einen request handler for FREE
 * app.get("/",(req,res)=> res.sendFile("path/to/index.html"))
 * app.get("/index.html",(req,res)=> res.sendFile("path/to/index.html"))
 */

app.get("/api/status", (req, res) => {
  res.send({ status: "Ok" });
});

app.get("/nobel-prize", (req, res) => {
  const { year, sortBy } = req.query;
  let responseData = [...data.prizes];

  if (year) {
    responseData = responseData.filter((prize) => {
      return prize.year === year;
    });
  }

  if (sortBy) {
   responseData.sort((prizeA, prizeB) => {
      if (prizeA[sortBy] >= prizeB[sortBy]) {
        return -1;
      } else if (prizeA[sortBy] <= prizeB[sortBy]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  res.json(responseData);
});

app.get("/*", (req, res) => {
  res.sendFile(ReactAppIndex.pathname);
});

app.listen(PORT, () => {
  console.log("Server running on Port: ", PORT);
});
