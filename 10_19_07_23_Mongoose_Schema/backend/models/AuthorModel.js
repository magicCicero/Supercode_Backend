import mongoose from "mongoose";
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Bitte geben Sie eine E-Mail-Adresse ein"],
  },
  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: "Bitte geben Sie eine gültige Nutzerrolle ein",
    },
    default: "user",
  },
});

export const Author = mongoose.model("Author", authorSchema);
