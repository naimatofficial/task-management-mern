import TaskAssignment from "../models/taskAssignmentModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import {
	createOne,
	deleteOne,
	getAll,
	getOne,
	updateOne,
	updateStatus,
} from "./handleFactory.js";

export const createTaskAssignment = catchAsync(async (req, res, next) => {
	const { user, task } = req.body;

	const userId = req.user._id.toString();

	const data = {
		user,
		task,
		manager: userId,
	};

	const doc = await TaskAssignment.create(data);

	if (!doc) {
		return next(new AppError("Task does not assign", 404));
	}

	res.status(201).json({
		status: "success",
		doc,
	});
});

export const getTaskAssignments = getAll(TaskAssignment);
export const getTaskAssignment = getOne(TaskAssignment);
export const deleteTaskAssignment = deleteOne(TaskAssignment);
export const updateTaskAssignment = updateOne(TaskAssignment);

export const updateTaskAssignStatus = updateStatus(TaskAssignment);
