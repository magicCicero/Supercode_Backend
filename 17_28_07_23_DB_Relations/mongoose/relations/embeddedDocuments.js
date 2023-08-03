import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017/relation-test");

const inventorySchema = new mongoose.Schema({
  name: String,
  category: {
    type: String,
    enum: ["bigstuff", "smallstuff"],
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

const userSchema = new mongoose.Schema({
  name: String,
  inventory: [inventorySchema],
});

const User = mongoose.model("User", userSchema);

await Inventory.findOneAndUpdate(
  { name: "Couch" },
  { name: "Couch", category: "bigstuff" },
  { upsert: true }
);

//{upsert: true} update or insert wenn kein user mit dem Namen Bernd gefunden wird
await User.findOneAndUpdate(
  { name: "Bernd" },
  { name: "Bernd", inventory:[{name: "Couch",category: "bigstuff"}] },
  { upsert: true }
);

await mongoose.disconnect();
