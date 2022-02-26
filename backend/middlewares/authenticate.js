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
  const refreshToken = req.headers["x-refresh"];

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      if (err.message === "jwt expired") {
        //do the stuff
        reIssueAccessToken(refreshToken)
          .then((newAccessToken) => {
            res.setHeader("x-access-token", newAccessToken);
            jwt.verify(
              newAccessToken,
              process.env.JWT_SECRET,
              async (err, data) => {
                if (err) return next({ err });
                const user = await User.findById(data.id);
                req.user = user;
                return next();
              }
            );
          })
          .catch((err) => next(err));
      } else {
        return next({ err });
      }
    } else {
      const user = await User.findById(data.id);
      req.user = user;
      next();
    }
  });
};

function reIssueAccessToken(refreshToken) {
  return new Promise((resolve, reject) => {
    if (!refreshToken) {
      reject({ msg: "refresh token not found, login again." });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, data) => {
      if (err) return reject({ msg: "invalid refresh token." });
      const user = await User.findById(data.id);
      const token = signAccessToken(user._id);
      resolve(token);
    });
  });
}

export { signAccessToken, signRefreshToken };
