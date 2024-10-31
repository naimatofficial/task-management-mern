import Task from "../models/taskModel.js";
import {
	createOne,
	deleteOne,
	getAll,
	getOne,
	updateOne,
} from "./handleFactory.js";

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";

export const createUserTask = catchAsync(async (req, res, next) => {
	const { title, description, status, startDate, endDate } = req.body;

	const taskData = {
		title,
		description,
		status,
		startDate,
		endDate,
		createdBy: req.user.userId, // Assigning the creator of the task
	};

	const task = await Task.create(taskData);

	res.status(201).json({
		status: "success",
		doc: task,
	});
});

export const updateUserTask = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { title, description, status, startDate, endDate } = req.body;

	const task = await Task.findById(id);

	if (!task) {
		return next(new AppError("Task not found.", 404));
	}

	// Check if the current user is allowed to update the task
	if (task.createdBy?._id?.toString() !== req.user?._id?.toString()) {
		return next(
			new AppError("You don't have permission to edit this task.", 403)
		);
	}

	// Create update data while excluding createdBy
	const updateData = {
		title,
		description,
		status,
		startDate,
		endDate,
	};

	// Proceed to update the task
	const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: "success",
		doc: updatedTask,
	});
});

export const deleteUserTask = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const task = await Task.findById(id);

	if (task.createdBy !== req.user.userId) {
		return next(
			new AppError("You don't have permission to delete this task.", 404)
		);
	}

	// Ensure the task belongs to the user
	const doc = await Task.findOneAndDelete(
		{
			_id: id,
			createdBy: req.user.userId,
		},
		{
			new: true,
			runValidators: true,
		}
	);

	if (!doc) {
		return next(new AppError("No task found with that ID", 404));
	}

	res.status(204).json({
		status: "success",
		doc: null,
	});
});

export const getUserTask = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	// Ensure the task belongs to the user
	const task = await Task.findOne({ _id: id, createdBy: req.user.userId });

	if (!task) {
		return next(new AppError("No task found with that ID", 404));
	}

	res.status(200).json({
		status: "success",
		doc: task,
	});
});

export const getAllUserTasks = catchAsync(async (req, res) => {
	// Fetch only tasks that belong to the user
	const user = req.user;

	let query = Task.find({ createdBy: user.userId });

	// EXECUTE QUERY
	const features = new APIFeatures(query, req.query)
		.filter()
		.sort()
		.fieldsLimit()
		.paginate();

	// for more detailed about query
	// const doc = await features.query.explain();
	const doc = await features.query;

	res.status(200).json({
		status: "success",
		results: doc.length,
		doc,
	});
});

// For Admin operations
export const createTask = createOne(Task);
export const getTasks = getAll(Task);
export const getTask = getOne(Task);
export const deleteTask = deleteOne(Task);
export const updateTask = updateOne(Task);
