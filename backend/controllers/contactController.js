import Contact from "../models/contactModel";
import { mapContacts } from "../utils/mapContacts";
import uploadImage from "../utils/uploadImage";

export const getContacts = async (req, res, next) => {
  try {
    const allContacts = await Contact.find({}).sort({ favorites: -1, name: 1 });
    res.status(200).json({ allContacts });
  } catch (e) {
    next(e);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = {};

    let iData;
    if (req.body.image && req.body.image.length) {
      iData = req.body.image[0].thumbUrl;
      newContact.image = await uploadImage(iData);
    }
    mapContacts(newContact, req.body);

    const contact = await Contact.create(newContact);
    res.status(201).json({ contact });
  } catch (e) {
    next(e);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const contact = await Contact.findOne({ slug });
    res.status(200).json({ contact });
  } catch (e) {
    next(e);
  }
};

export const editContact = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { mobile, work, home } = req.body;
    const contact = await Contact.findOne({ slug });
    if (!contact)
      return res.status(400).json({ msg: "No such contact found." });
    const toEdit = {};
    if (req.body.image) {
      let iData = req.body.image[0].thumbUrl;
      toEdit.image = await uploadImage(iData);
    }
    mapContacts(toEdit, req.body);
    delete toEdit.contactNumber;

    Contact.findOneAndUpdate({ slug }, toEdit, { new: true }).then(
      async (doc) => {
        if (mobile) doc.contactNumber[0].mobile = mobile;
        if (home) doc.contactNumber[0].home = home;
        if (work) doc.contactNumber[0].work = work;
        await doc.save();
        res.status(200).json({ doc });
      }
    );
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

export const favContact = async (req, res, next) => {
  try {
    const { slug } = req.body;
    const contact = await Contact.findOneAndUpdate(
      { slug },
      { $push: { favorites: req.user._id } },
      { new: true }
    );

    res.status(200).json({ contact });
  } catch (e) {
    next(e);
  }
};

export const UnFavContact = async (req, res, next) => {
  try {
    const { slug } = req.body;
    const contact = await Contact.findOneAndUpdate(
      { slug },
      { $pull: { favorites: req.user._id } },
      { new: true }
    );

    res.status(200).json({ contact });
  } catch (e) {
    next(e);
  }
};
