import express from "express";
import { login, register } from "../controllers/userController";
import { validateBody } from "../middlewares/validator";
import { userSchema } from "../utils/schema";
const router = new express.Router();

router.post("/login", validateBody(userSchema), login);

router.post("/register", validateBody(userSchema), register);

export default router;
