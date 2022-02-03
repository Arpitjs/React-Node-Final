import express from "express";
import { createContact, getContact, getContacts, editContact, deleteContact } from "../controllers/contactController";
import { authenticate } from "../middlewares/authenticate";
const router = new express.Router();

router.use(authenticate);

router.route('/')
.get(getContacts)
.post(createContact);

router.route('/:slug')
.get(getContact)
.put(editContact)
.delete(deleteContact);

export default router;
