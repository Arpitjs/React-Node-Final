import express from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  createContact,
  getContact,
  getContacts,
  editContact,
  deleteContact,
  favContact,
  unFavContact,
} from "../controllers/contactController";
import { validateBody } from "../middlewares/validator";
import { contactSchema } from "../utils/schema";

const router = new express.Router();
router.use(authenticate);

router.route("/")
.get(getContacts)
.post(validateBody(contactSchema), createContact);

router.route("/:slug")
.get(getContact)
.put(editContact)
.delete(deleteContact);

router.post("/favorite-contact", favContact);
router.post("/unfavorite-contact", unFavContact);

export default router;
