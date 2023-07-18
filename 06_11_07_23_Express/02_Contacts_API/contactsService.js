import fs from "fs";
import express from "express";
const app = express();

const contactURL = new URL("contacts.json", import.meta.url);
// Erstelle leere Arrays

let contacts = [];

// Die Kontakte werden hier immer überschrieben, wenn die Funktion aufgerufen wird
export const writingContacts = async (newContact) => {
  let contacts = fs.readFileSync(contactURL, { encoding: "utf-8" });
  contacts = JSON.parse(contacts);
  let upToDateContacts = contacts.push(newContact);
  upToDateContacts = fs.writeFileSync(
    contactURL,
    JSON.stringify(contacts, null, 2)
  );
  console.log(contacts);
  return contacts;
};

// Es werden die Kontakte geladen aus dem definierten Pfad. Die JSON Datei ist bereits beispielhaft gefüllt
export const readingContacts = async () => {
  contacts = fs.readFileSync(contactURL, { encoding: "utf-8" });
  //   Der Inhalt wird mit JSON Parse in ein JS OBjekt umgewandlet und der Variable zugewiesen bzw zwischengespeichert
  let formattedContacts = JSON.parse(contacts);
  //   Die Variable wird mit Map geprüft, wobei jedem Kontakt eine ID anhand des Indexes hinzugefügt wird.Mit dem SpreadOperator werden alle Felder beibehalten und werden nach dem ID Eintrag angehängt.
  contacts = formattedContacts.map((contact, index) => ({
    id: index + 1,
    ...contact,
  }));
  return contacts;
};

export const deletingContacts = async (deleteContact) => {
  await fs.promises.writeFile(
    contactURL,
    JSON.stringify(deleteContact, null, 2)
  );
  let contacts = JSON.parse(
    await fs.promises.readFile(contactURL, { encoding: "utf-8" })
  );
  return contacts;
};

export const updateContacts = async (updateContact) => {
  let contacts = JSON.parse(
    await fs.promises.readFile(contactURL, { encoding: "utf-8" })
  );
  await fs.promises.writeFile(
    contactURL,
    JSON.stringify(updateContact, null, 2)
  );
  return contacts;
};
