import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { authRoutes } from "./auth.routes";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/users", usersRoutes);

export { router };

