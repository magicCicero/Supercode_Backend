import express from "express";
import fs from "fs";

const app = express();
const PORT = 9898;
const contactURL = new URL("contacts.json", import.meta.url);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// Erstelle leere Arrays
let contacts = [];
let formattedContacts = [];

// Es werden die Kontakte geladen aus dem definierten Pfad. Die JSON Datei ist bereits beispielhaft gefüllt
const readingContacts = () => {
  contacts = fs.readFileSync(contactURL, { encoding: "utf-8" });
  //   Der Inhalt wird mit JSON Parse in ein JS OBjekt umgewandlet und der Variable zugewiesen bzw zwischengespeichert
  formattedContacts = JSON.parse(contacts);
  //   Die Variable wird mit Map geprüft, wobei jedem Kontakt eine ID anhand des Indexes hinzugefügt wird.Mit dem SpreadOperator werden alle Felder beibehalten und werden nach dem ID Eintrag angehängt.
  contacts = formattedContacts.map((contact, index) => ({
    id: index + 1,
    ...contact,
  }));
};

// Die Kontakte werden hier immer überschrieben, wenn die Funktion aufgerufen wird
const writingContacts = () => {
  fs.writeFileSync(contactURL, JSON.stringify(contacts, null, 2));
};

// Alle Kontakte werden geladen und die vorherigen Funktionen aufgerufen
app.get("/contacts", (req, res) => {
  readingContacts();
  writingContacts();
  console.log(contacts);
  res.send(contacts);
});

// Ein Kontakt wird anhand der ID aufgerufen. Die req.params.id wird dabei als Number umgewandelt.
// Die Variable Contacts wird anhand der Find Funktion und der entsprechendne ID durchlaufen.
// Die Response wird anhand einer Bedingung zurückgegeben.
app.get("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((contact) => contact.id === id);
  //   const contact = contacts.filter((contact) => contact.id === contact.id);
  if (contact) {
    res.status(200).send(contact);
  } else {
    res.status(404).send("Kontakt nicht gefunden");
  }
});

// User kann auf dem Pfad einen neuen Contact hinzufügen. Die Req.body wird zwischengespeichert und in dem bestehenden JSON gepusht. Anschließnd wird die lokale Datei überschrieben
app.post("/contacts", (req, res) => {
  const newContact = req.body;
  contacts.push(newContact);
  writingContacts();
  res.status(201).send(newContact);
});

// User kann anhand einer aufgerufenen Contact ID die entsprechenden Kontakt löschen. Dabei wird die filter Methode angewendet, der ebenfalls nach der ID sucht
app.delete("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter((contact) => contact.id !== id);
  writingContacts();
  res.status(204).send("Kontakt gelöscht");
});

app.listen(PORT, () => {
  console.log("Ich stehe vor der Tür mit der Nummer " + PORT);
});
