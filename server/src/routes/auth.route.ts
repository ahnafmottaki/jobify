import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middlewares/validationMiddleware";

const router = Router();

router.post("/register", validateRegisterInput, register);

router.post("/login", validateLoginInput, login);

router.get("/logout", logout);

export default router;
