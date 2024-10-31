import Task from "../models/taskModel.js";
import { updateStatus } from "./handleFactory.js";

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";

export const createTask = catchAsync(async (req, res, next) => {
	const {
		title,
		description,
		status = "pending",
		startDate,
		endDate,
	} = req.body;

	const userId = req.user._id.toString();

	const taskData = {
		title,
		description,
		status,
		startDate,
		endDate,
		createdBy: userId,
	};

	const task = await Task.create(taskData);

	res.status(201).json({
		status: "success",
		doc: task,
	});
});

export const updateTask = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { title, description, status, startDate, endDate } = req.body;
	const userId = req.user._id.toString();

	const isAdmin = req.user.role === "admin";

	const task = await Task.findById(id);

	if (!task) {
		return next(new AppError("No task found with that ID", 404));
	}

	const createdBy = task.createdBy._id.toString();

	// Check if the current user is allowed to update the task
	if (createdBy !== userId && !isAdmin) {
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

export const deleteTask = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const userId = req.user._id.toString();

	const isAdmin = req.user.role === "admin";

	const task = await Task.findById(id);

	if (!task) {
		return next(new AppError("No task found with that ID", 404));
	}

	const createdBy = task.createdBy._id.toString();

	if (createdBy !== userId && !isAdmin) {
		return next(
			new AppError("You don't have permission to delete this task.", 404)
		);
	}

	// Ensure the task belongs to the user
	const doc = isAdmin
		? await Task.findByIdAndDelete(id)
		: await Task.findOneAndDelete({
				_id: id,
				createdBy: userId,
		  });

	if (!doc) {
		return next(new AppError("No task found with that ID", 404));
	}

	res.status(204).json({
		status: "success",
		doc: null,
	});
});

export const getTask = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const userId = req.user._id.toString();

	const doc =
		req.user.role === "admin"
			? await Task.findOne({
					_id: id,
			  }).lean()
			: await Task.findOne({
					_id: id,
					createdBy: userId,
			  }).lean();

	if (!doc) {
		return next(new AppError("No task found with that ID", 404));
	}

	res.status(200).json({
		status: "success",
		doc,
	});
});

export const getAllTasks = catchAsync(async (req, res, next) => {
	// Fetch only tasks that belong to the user
	const userId = req.user._id.toString();

	const isAdmin = req.user.role === "admin";

	const query = Task.find(isAdmin ? {} : { createdBy: userId });

	// EXECUTE QUERY
	const features = new APIFeatures(query, req.query)
		.filter()
		.sort()
		.fieldsLimit()
		.paginate();

	// for more detailed about query
	const doc = await features.query;

	res.status(200).json({
		status: "success",
		results: doc.length,
		doc,
	});
});

export const updateTaskStatus = updateStatus(Task);
