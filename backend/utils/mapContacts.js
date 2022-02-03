import { slugify } from "../utils/slug";

export const mapContacts = function (obj1, obj2) {
  if (obj2.email) {
    obj1.email = obj2.email;
  }
  if (obj2.name) {
    obj1.name = obj2.name;
    obj1.slug = slugify(obj2.name);
  }

  if (obj2.photo) {
    obj1.photo = obj2.photo;
  }
  if (obj2.address) {
    obj1.address = obj2.address;
  }

  if (obj2.phone) {
    obj1.phone = obj2.phone;
  }
};
