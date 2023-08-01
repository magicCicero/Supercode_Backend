import { Router } from "express";
import User from "./model.js";
import { generateAccessToken, authenticatToken } from "./authToken.js";

export const userRouter = Router();

const hoursInMilliseconds = (hours) => {
  return 1000 * 60 * 60 * hours;
};

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
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.find({ email }).select("+hash").select("+salt");
  // dieses password würde den gleichen hash produzieren
  // wie in der Datenbank
  const passwordIsValid = user.verifyPassword(password);
  if (passwordIsValid) {
    const token = generateAccessToken({ email });
    console.log(token);
    res.cookie("auth", token, {
      httpOnly: true,
      maxAge: hoursInMilliseconds(4),
    });
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

userRouter.get("/secure", authenticatToken, async (req, res) => {
  console.log(req.user);
  res.send("SUCCESS");
});
