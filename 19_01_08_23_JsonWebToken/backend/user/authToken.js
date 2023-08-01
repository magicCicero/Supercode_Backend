import jwt from "jsonwebtoken";

export function generateAccessToken(userEmailObj, persist = false) {
  return jwt.sign(userEmailObj, process.env.SECRET, {
    expiresIn: persist ? "7d" : "1h",
  });
}

export function authenticatToken(req, res, next) {
  let token = null;
  if (req?.cookies?.auth) {
    token = req.cookies.auth;
  }
  if (!token) {
    const authHeader = req.headers["authorization"];
    token = authHeader && authHeader.split(" ")[1];
  }

  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    console.log(err, user);
    if (err) {
      return res.sendStatus(403);
    }
    req.userEmail = user.email;
    next();
  });
}
