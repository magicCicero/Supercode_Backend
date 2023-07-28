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
  inventory: [{ type: mongoose.Types.ObjectId, ref: "Inventory" }],
});

const User = mongoose.model("User", userSchema);

const invent = await Inventory.findOneAndUpdate(
  { name: "Couch" },
  { name: "Couch", category: "bigstuff" },
  { upsert: true }
);
console.log(invent);
//{upsert: true} update or insert wenn kein user mit dem Namen Bernd gefunden wird

const user = await User.findOne({ name: "Bernd" }).populate("inventory");
// user.inventory.push(invent)
// await user.save()
console.log(user);

await mongoose.disconnect();
