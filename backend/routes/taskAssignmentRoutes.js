import express from "express";
import {
	createTaskAssignment,
	deleteTaskAssignment,
	getTaskAssignment,
	getTaskAssignments,
	updateTaskAssignment,
	updateTaskAssignStatus,
} from "./../controllers/taskAssignmentController.js";

import checkObjectId from "../middleware/checkObjectId.js";
import { protect, restrictTo } from "./../middleware/authMiddleware.js";

const router = express.Router();

router.use("/", protect, restrictTo("admin", "manager"));

router.route("/").post(createTaskAssignment).get(getTaskAssignments);

router
	.route("/:id", checkObjectId)
	.get(getTaskAssignment)
	.put(updateTaskAssignment)
	.delete(deleteTaskAssignment);

router.put("/status/:id", updateTaskAssignStatus);

export default router;
