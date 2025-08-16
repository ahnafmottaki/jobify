import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-sats", getApplicationStats);
router.patch("/update-user", updateUser);

export default router;
