import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { authRoutes } from "./auth.routes";
import { activitiesRoutes } from "./activities.routes";
import { tasksRoutes } from "./tasks.routes";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/activities", activitiesRoutes);
router.use("/api/tasks", tasksRoutes);

export { router };

