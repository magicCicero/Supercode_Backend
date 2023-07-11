import express from "express";

const app = express();
const PORT = 9898;

// # Wir wollen einen Autohandel simulieren
// WIr brauchen folgende Routen:
// a wir wollen alle Autos
// b wir erzeugen ein neues Auto
// c wir wollen ein bestimmtes auto

// POST     -> CREATE   ->      C
// GET      -> READ     ->      R
// PUT      -> UPDATE   ->      U
// DELETE   -> DELETE   ->      D

const cars = [];

// Middleware zum auslesen des Bodys, wenn diese Daten in der JSON enthalten sind
// Body-Parser:
app.use(express.json());

app.get("/cars", (req, res) => {
  res.json(cars);
});

// # Ein neues Auto erstellen

app.post("/cars", (req, res) => {
  cars.push({ modell: "bmw" });
  getID(cars);
  res.json(cars);
});

const getID = (cars) => {
  cars.forEach((o, i) => (o.id = i + 1));
};

app.delete("/cars", (req, res) => {
  console.log("schau dir mal mein body an", req.body);
  const { id } = req.body;
  console.log(id);
  cars.map((item, key, arr) => {
    if (item.id === id) {
      arr.splice(key, 1);
    }
  });
  res.json(cars);
});
app.listen(PORT, () => {
  console.log("Ich stehe vor der Tür mit der Nummer " + PORT);
});
