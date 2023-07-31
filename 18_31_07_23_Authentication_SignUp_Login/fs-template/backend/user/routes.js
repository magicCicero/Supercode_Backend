import { Router } from "express";
import User from "./model.js";

export const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  let user = new User({ name, email });
  user.setPassword(password);
  user = await user.save();
  res.send({ message: "New user created", user: user });
});

userRouter.post("./login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email }).select("+hash").select("+salt");
  // dieses password würde den gleichen hash produzieren
  // wie in der Datenbank
  const passwordIsValid = user.verifyPassword(password);
  if (passwordIsValid) {
    res.send({ message: "Success", data: user });
  } else {
    res.status(404).send({
      message: "Failed to login",
      error: {
        message: "Password and Email combination is wrong",
      },
    });
  }
});
