import express from "express";
import {
	createTask,
	deleteTask,
	getAllTasks,
	getTask,
	updateTask,
	updateTaskStatus,
} from "./../controllers/taskController.js";
import checkObjectId from "../middleware/checkObjectId.js";
import { protect, restrictTo } from "./../middleware/authMiddleware.js";

const router = express.Router();

// Admin routes
router.route("/").post(protect, createTask).get(protect, getAllTasks);

router
	.route("/:id", checkObjectId)
	.get(protect, getTask)
	.put(protect, updateTask)
	.delete(protect, deleteTask);

// User Task routes
// router
// 	.route("/user")
// 	// .post(protect, createUserTask)
// 	// .get(protect, getAllUserTasks);

// router
// 	.route("/user/:id", checkObjectId)
// 	.get(protect, getUserTask)
// 	.put(protect, updateUserTask)
// 	.delete(protect, deleteUserTask);

router.put("/status/:id", updateTaskStatus);

export default router;
