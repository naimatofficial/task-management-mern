import express from "express";

import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";
import statsRoutes from "./statsRoutes.js";
import taskAssignmentRoutes from "./taskAssignmentRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/task/assigns", taskAssignmentRoutes);
router.use("/stats", statsRoutes);

// Stats routes

export default router;
