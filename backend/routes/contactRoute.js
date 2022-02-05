import express from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  createContact,
  getContact,
  getContacts,
  editContact,
  deleteContact,
  favContact,
  UnFavContact,
} from "../controllers/contactController";

const router = new express.Router();
router.use(authenticate);

router.route("/")
.get(getContacts)
.post(createContact);

router.route("/:slug")
.get(getContact)
.put(editContact)
.delete(deleteContact);

router.post("/favorite-contact", favContact);
router.post("/unfavorite-contact", UnFavContact);

export default router;
