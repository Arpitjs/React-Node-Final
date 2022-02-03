import Contact from "../models/contactModel";
import { mapContacts } from "../utils/mapContacts";
import uploadImage from "../utils/uploadImage";

export const getContacts = async (req, res, next) => {
  try {
    const allContacts = await Contact.find({});
    res.status(200).json({ data: allContacts });
  } catch (e) {
    next(e);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = {};
    const imageData = await uploadImage(req.files.image.tempFilePath);

    newContact.image = imageData;
    req.body.email = req.user.email;
    mapContacts(newContact, req.body);
    const contact = await Contact.create(newContact);
    res.status(201).json({ data: contact });
  } catch (e) {
    next(e);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const contact = await Contact.findOne({ slug });
    res.status(200).json({ data: contact });
  } catch (e) {
    next(e);
  }
};

export const editContact = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const contact = await Contact.findOne({ slug });
    if (!contact)
      return res.status(400).json({ msg: "No such contact found." });
    const toEdit = {};
    const imageData = await uploadImage(req.files.image.tempFilePath);
    toEdit.image = imageData;
    req.body.email = req.user.email;
    mapContacts(toEdit, req.body);
    const updatedContact = await Contact.findOneAndUpdate({ slug }, toEdit, {
      new: true,
    });
    res.status(200).json({ data: updatedContact });
  } catch (e) {
    next(e);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const contact = await Contact.findOne({ slug });
    if (!contact)
      return res.status(400).json({ msg: "No such contact found." });
    await Contact.findOneAndDelete({ slug });
    res.status(204).json({ msg: "contact deleted." });
  } catch (e) {
    next(e);
  }
};
