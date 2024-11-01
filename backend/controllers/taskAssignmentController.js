import TaskAssignment from "../models/taskAssignmentModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

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

export const getAllTaskAssignments = catchAsync(async (req, res, next) => {
	const userId = req.user._id.toString();

	const isAdmin = req.user.role === "admin";
	const isManager = req.user.role === "manager";

	const query = TaskAssignment.find(
		isAdmin ? {} : isManager ? { manager: userId } : { user: userId }
	);

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

export const getTaskAssignment = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const userId = req.user._id.toString();

	const doc =
		req.user.role === "admin"
			? await TaskAssignment.findOne({
					_id: id,
			  }).lean()
			: await TaskAssignment.findOne({
					_id: id,
					manager: userId,
			  }).lean();

	if (!doc) {
		return next(new AppError("No task assign found with that ID", 404));
	}

	res.status(200).json({
		status: "success",
		doc,
	});
});

export const deleteTaskAssignment = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const userId = req.user._id.toString();

	const isAdmin = req.user.role === "admin";

	const taskAssign = await TaskAssignment.findById(id);

	if (!taskAssign) {
		return next(new AppError("No task assign found with that ID", 404));
	}

	const managerId = taskAssign.manager._id.toString();

	if (managerId !== userId && !isAdmin) {
		return next(
			new AppError("You don't have permission to delete this task assign.", 404)
		);
	}

	// Ensure the task belongs to the user
	const doc = isAdmin
		? await TaskAssignment.findByIdAndDelete(id)
		: await TaskAssignment.findOneAndDelete({
				_id: id,
				manager: userId,
		  });

	if (!doc) {
		return next(new AppError("No task assign found with that ID", 404));
	}

	res.status(204).json({
		status: "success",
		doc: null,
	});
});

export const updateTaskAssignment = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { task, user } = req.body;
	const userId = req.user._id.toString();

	const isAdmin = req.user.role === "admin";

	const taskAssign = await TaskAssignment.findById(id);

	if (!taskAssign) {
		return next(new AppError("No task found with that ID", 404));
	}

	const managerId = taskAssign.manager._id.toString();

	// Check if the current user is allowed to update the task
	if (managerId !== userId && !isAdmin) {
		return next(
			new AppError("You don't have permission to edit this task.", 403)
		);
	}

	const updateData = {
		task,
		user,
	};

	// Proceed to update the task
	const updatedTask = await TaskAssignment.findByIdAndUpdate(id, updateData, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: "success",
		doc: updatedTask,
	});
});
