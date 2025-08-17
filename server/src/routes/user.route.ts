import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/user.controller";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middlewares/authMiddleware";
import upload from "../middlewares/multer";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);
router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

export default router;
