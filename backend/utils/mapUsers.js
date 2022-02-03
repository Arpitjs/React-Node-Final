const { encryptPassword } = require("./hash");

module.exports = async function (obj1, obj2) {
  if (obj2.email) {
    obj1.email = obj2.email;
  }
  if (obj2.password) {
    obj1.password = await encryptPassword(obj2.password);
  }
};
