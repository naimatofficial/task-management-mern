import express from "express";
import {
	createTask,
	createUserTask,
	deleteTask,
	deleteUserTask,
	getTask,
	getTasks,
	getUserTask,
	updateTask,
	updateUserTask,
} from "./../controllers/taskController.js";
import checkObjectId from "../middleware/checkObjectId.js";
import { protect, restrictTo } from "./../middleware/authMiddleware.js";

const router = express.Router();

// Admin routes
router.route("/admin").post(createTask).get(getTasks);

router
	.route("/admin/:id", checkObjectId)
	.get(protect, restrictTo("admin", "manager"), getTask)
	.put(protect, restrictTo("admin", "manager"), updateTask)
	.delete(protect, restrictTo("admin"), deleteTask);

// User Task routes
router.route("/user").post(protect, createUserTask).get(protect, getUserTask);

router
	.route("/user/:id", checkObjectId)
	.get(protect, getUserTask)
	.put(protect, updateUserTask)
	.delete(protect, deleteUserTask);

export default router;
