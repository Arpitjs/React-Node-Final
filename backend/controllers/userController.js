import User from "../models/userModel";
import mapUsers from "../utils/mapUsers";
import { decryptPassword } from "../utils/hash";
import { signAccessToken, signRefreshToken } from "../middlewares/authenticate";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials." });
    /* password decrypt process */
    const decrypted = await decryptPassword(user.password);
    if (password !== decrypted)
      return res.status(400).json({ msg: "Invalid credentials." });
    
 /* token generation process */
  const token = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);
   res.status(200).json({ user, token, refreshToken });
  } catch (e) {
    next(e);
  }
};

export const register = async (req, res, next) => {
  try {
    const newUser = {};
    await mapUsers(newUser, req.body);
    const user = await User.create(newUser);
    res.status(200).json({ user });
  } catch (e) {
    if (e.code === 11000)
      return next({ msg: "Duplicate data. Please try with another one"});
    next(e);
  }
};
