const { createCipheriv, createDecipheriv, randomBytes } = require("crypto");

const algorithm2 = "aes-256-cbc";
const initVector = randomBytes(16);
const SecurityKey = randomBytes(32);

const passwordHash = (password) => {
  return new Promise((resolve) => {
    const cipher = createCipheriv(algorithm2, SecurityKey, initVector);
    let encrypted = cipher.update(password, "utf-8", "hex");
    encrypted += cipher.final("hex");
    resolve(encrypted);
  });
};

const decryptPassword = (encryptedPassword) => {
  return new Promise((resolve) => {
    const decipher = createDecipheriv(algorithm2, SecurityKey, initVector);
    let decrypted = decipher.update(encryptedPassword, "hex", "utf-8");
    decrypted +=  decipher.final("utf-8");
      resolve(decrypted);
  });
};

module.exports = {
  passwordHash,
  decryptPassword
};
