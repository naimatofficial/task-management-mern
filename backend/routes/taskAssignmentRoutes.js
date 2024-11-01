import express from "express";
import {
	createTaskAssignment,
	deleteTaskAssignment,
	getAllTaskAssignments,
	getTaskAssignment,
	updateTaskAssignment,
} from "./../controllers/taskAssignmentController.js";

import checkObjectId from "../middleware/checkObjectId.js";
import { protect, restrictTo } from "./../middleware/authMiddleware.js";

const router = express.Router();

router
	.route("/")
	.post(protect, restrictTo("admin", "manager"), createTaskAssignment)
	.get(protect, getAllTaskAssignments);

router
	.route("/:id", checkObjectId)
	.get(protect, restrictTo("admin", "manager"), getTaskAssignment)
	.put(protect, restrictTo("admin", "manager"), updateTaskAssignment)
	.delete(protect, restrictTo("admin", "manager"), deleteTaskAssignment);

export default router;
