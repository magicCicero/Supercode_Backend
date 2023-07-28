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

const invent = await Inventory.findOneAndUpdate(
  { name: "Couch" },
  { name: "Couch", category: "bigstuff" },
  { upsert: true }
);

const userSchema = new mongoose.Schema({
  name: String,
  inventory: [{ type: mongoose.Types.ObjectId, ref: "Inventory" }],
});

const User = mongoose.model("User", userSchema);

await User.findOneAndUpdate(
  { name: "Bernd" },
  { name: "Bernd", inventory: [invent] },
  { upsert: true }
);

const user = await User.findOneAndUpdate({ name: "Bernd" }).populate(
  "inventory"
);

console.log(user);
// user.inventory.push(invent);
// await user.save();

await mongoose.disconnect();
