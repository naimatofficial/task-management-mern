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

router.route("/").post(protect, createTask).get(protect, getAllTasks);

router
	.route("/:id", checkObjectId)
	.get(protect, getTask)
	.put(protect, updateTask)
	.delete(protect, deleteTask);

router.put("/status/:id", updateTaskStatus);

export default router;
