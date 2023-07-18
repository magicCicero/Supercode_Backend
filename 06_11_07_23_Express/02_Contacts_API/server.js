import express from "express";
import fs from "fs";
import {
  writingContacts,
  readingContacts,
  deletingContacts,
  updateContacts,
} from "./contactsService.js";

const app = express();
const PORT = 9898;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// Erstelle leere Arrays

let contacts = [];
// Alle Kontakte werden geladen und die vorherigen Funktionen aufgerufen
app.get("/contacts", (req, res) => {
  readingContacts().then((contacts) => {
    res.json(contacts);
  });
});

// Ein Kontakt wird anhand der ID aufgerufen. Die req.params.id wird dabei als Number umgewandelt.
// Die Variable Contacts wird anhand der Find Funktion und der entsprechendne ID durchlaufen.
// Die Response wird anhand einer Bedingung zurückgegeben.
app.get("/contacts/:id", async (req, res) => {
  let contacts = await readingContacts();
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
app.post("/contacts", async (req, res) => {
  const newContact = req.body;
  let newContactEntry = await writingContacts(newContact);
  res.status(201).send(newContactEntry);
});

// User kann anhand einer aufgerufenen Contact ID die entsprechenden Kontakt löschen. Dabei wird die filter Methode angewendet, der ebenfalls nach der ID sucht
app.delete("/contacts/:id", async (req, res) => {
  const id = Number(req.params.id);
  let contacts = await readingContacts();
  let deleteContact = contacts.filter((contact) => contact.id !== id);
  await deletingContacts(deleteContact);
  res.status(200).send("Kontakt gelöscht");
});

app.put("/contacts/:id", async (req, res) => {
  const id = Number(req.params.id);
  let contacts = await readingContacts();
  let updateContact = contacts.filter((contact) => contact.id === id);
  await updateContacts(updateContact);
  res.status(200).send("Kontakt aktualisiert");
});

app.listen(PORT, () => {
  console.log("Ich stehe vor der Tür mit der Nummer " + PORT);
});
