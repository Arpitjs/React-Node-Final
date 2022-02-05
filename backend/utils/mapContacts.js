import { slugify } from "../utils/slug";

export const mapContacts = function (obj1, obj2) {
  if (obj2.email) {
    obj1.email = obj2.email;
  }
  if (obj2.name) {
    obj1.name = obj2.name;
    obj1.slug = slugify(obj2.name);
  }
  if (obj2.address) {
    obj1.address = obj2.address;
  }
  if (obj2.country) {
    obj1.country = obj2.country;
  }
  if (obj2.gender) {
    obj1.gender = obj2.gender;
  }
  if (obj2.mobile || obj2.work || obj2.home) {
    obj1.contactNumber = [];
    obj1.contactNumber.push({
      mobile: obj2.mobile,
      work: obj2.work,
      home: obj2.home,
    });
  }
};
