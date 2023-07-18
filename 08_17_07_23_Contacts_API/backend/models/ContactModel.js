import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
  },
  street: {
    type: "string",
  },
  city: {
    type: "string",
  },
  state: {
    type: "string",
  },
  zip: {
    type: "string",
  },
  telefone: {
    type: "string",
  },
  mail: {
    type: "string",
  },
});

export const Contact = mongoose.model("Contact", contactSchema);
