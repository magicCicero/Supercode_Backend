import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Hallo Startseite!");
});

app.get("/cars/", (req, res) => {
  res.send("Hallo Cars!");
});

app.post("/cars", (req, res) => {
  res.send("Hallo. Danke für dein Auto");
});

app.use((req, res, next) => {
  res.send("Keiner mag dich haben");
});

app.listen(9898, () => console.log("ich stehe vor der Tür"));
