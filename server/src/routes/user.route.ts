import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/user.controller";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware";
import { authorizePermissions } from "../middlewares/authMiddleware";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);
router.patch("/update-user", validateUpdateUserInput, updateUser);

export default router;
