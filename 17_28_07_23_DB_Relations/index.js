import mongoose from "mongoose";

await mongoose.connect("mongodb://127.0.0.1:27017/relation");

const inventorySchema = new mongoose.Schema({
  name: String,
  category: {
    type: String,
    enum: ["bigstuff,smallstuff,mediumstuff"],
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

await Inventory.findOneAndUpdate(
  { name: "Couch" },
  { name: "Couch", category: "bigstuff" },
  { upsert: true }
);

const userSchema = new mongoose.Schema({
  name: String,
  inventory: [inventorySchema],
});

const User = mongoose.model("User", userSchema);

await User.findOneAndUpdate(
  { name: "Bernd" },
  { name: "Bernd", inventory: [{ name: "Couch", category: "bigstuff" }] },
  { upsert: true }
);

await mongoose.disconnect();
