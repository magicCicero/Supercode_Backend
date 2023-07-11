import express from "express";
import fs from "fs";

const app = express();
const PORT = 9898;
const contactURL = new URL("contacts.json", import.meta.url);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

let contacts = [];
let formattedContacts = [];

const readingContacts = () => {
  contacts = fs.readFileSync(contactURL, { encoding: "utf-8" });
  formattedContacts = JSON.parse(contacts);
  contacts = formattedContacts.map((contact, index) => ({
    id: index + 1,
    ...contact,
  }));
};

const writingContacts = () => {
  fs.writeFileSync(contactURL, JSON.stringify(contacts, null, 2));
};

app.get("/contacts", (req, res) => {
  readingContacts();
  writingContacts();
  console.log(contacts);
  res.send(contacts);
});

app.get("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((contact) => contact.id === id);
  if (contact) {
    res.status(200).send(contact);
  } else {
    res.status(404).send("Kontakt nicht gefunden");
  }
});

app.post("/contacts", (req, res) => {
  const newContact = req.body;
  contacts.push(newContact);
  writingContacts();
  res.status(201).send(newContact);
});

app.delete("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter((contact) => contact.id !== id);
  writingContacts();
  res.status(204).send("Kontakt gelöscht");
});

app.listen(PORT, () => {
  console.log("Ich stehe vor der Tür mit der Nummer " + PORT);
});
