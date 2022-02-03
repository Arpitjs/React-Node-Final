import express from "express";
import { login, register } from "../controllers/userController";
import { renewAccessToken } from "../middlewares/authenticate";
const router = new express.Router();

router.post("/login", login);

router.post("/register", register);

router.post('/renew-token', renewAccessToken);

export default router;
