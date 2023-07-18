import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "./models/index.js";
import { Contact } from "./models/ContactModel.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
  console.log(contacts);
});

app.post("/api/contacts", async (req, res) => {
  const newContact = new Contact(req.body);
  await newContact.save();
  res.json(newContact);
  console.log(newContact);
});

app.delete("/api/contacts/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Kontakt gelöscht mit der ID: " + req.params.id });
  console.log(req.params.id);
});

app.put("/api/contacts/:id", async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Kontakt bearbeitet mit der ID: " + req.params.id });
  console.log(req.params.id);
});

app.get("/api/contacts/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.json(contact);
  console.log(req.params.id);
});

app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
