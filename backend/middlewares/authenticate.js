import * as jwt from "jsonwebtoken";
import User from "../models/userModel";

const signAccessToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
const signRefreshToken = (id) =>
  jwt.sign({ id }, process.env.REFRESH_TOKEN, { expiresIn: "7d" });

export const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return next({ msg: "User not authenticated." });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) return next({ err });
    const user = await User.findById(data.id);
    req.user = user;
    next();
  });
};

export const renewAccessToken = (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return next({ msg: "User not authenticated." });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, data) => {
    if (err) return next({ err });
    const user = await User.findById(data.id);
    const token = signAccessToken(user._id);
    return res.status(201).json({ token });
  });
};

export { signAccessToken, signRefreshToken };
