import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "./../utils/appError.js";

export const getDashboardStats = catchAsync(async (req, res, next) => {
	// Count total users and filter by role to get managers
	const totalUsers = await User.countDocuments();
	const totalManagers = await User.countDocuments({ role: "manager" });

	// Count total tasks and filter by status
	const totalTasks = await Task.countDocuments();
	const tasksByStatus = {
		pending: await Task.countDocuments({ status: "pending" }),
		inProgress: await Task.countDocuments({ status: "in-progress" }),
		completed: await Task.countDocuments({ status: "completed" }),
	};

	const stats = {
		totalTasks,
		tasksByStatus,
		totalUsers,
		totalManagers,
	};

	res.status(200).json({
		status: "success",
		doc: stats,
	});
});

export const getUserStats = catchAsync(async (req, res, next) => {
	const userId = req.params.userId;

	// Check if user exists
	const userExists = await User.findById(userId);

	if (!userExists) {
		return next(new AppError("No document found with that ID", 404));
	}

	// Count total tasks by user and filter by status
	const totalTasks = await Task.countDocuments({ createdBy: userId });
	const tasksByStatus = {
		pending: await Task.countDocuments({
			createdBy: userId,
			status: "pending",
		}),
		inProgress: await Task.countDocuments({
			createdBy: userId,
			status: "inProgress",
		}),
		completed: await Task.countDocuments({
			createdBy: userId,
			status: "completed",
		}),
	};

	const stats = {
		totalTasks,
		tasksByStatus,
	};

	res.status(200).json({
		status: "success",
		doc: stats,
	});
});
