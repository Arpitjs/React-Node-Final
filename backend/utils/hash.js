const crypto = require("crypto");

const algorithm = "aes-192-cbc";
const key = crypto.scryptSync("secret", "salt", 24);

const encryptPassword = (password) => {
  return new Promise((resolve) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = cipher.update(password, "utf8", "hex");
    const data = [
      encrypted + cipher.final("hex"),
      Buffer.from(iv).toString("hex"),
    ].join("|");
    resolve(data);
  });
};

const decryptPassword = (password) => {
  return new Promise((resolve) => {
    const [encrypted, iv] = password.split("|");
    if (!iv) throw new Error("IV not found");
    const decipher = crypto.createDecipheriv(
      algorithm,
      key,
      Buffer.from(iv, "hex")
    );
    resolve(decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8"));
  });
};

module.exports = {
  encryptPassword, decryptPassword
}