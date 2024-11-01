import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "./../utils/appError.js";

export const getDashboardStats = catchAsync(async (req, res, next) => {
	const user = req.user;

	let dashboardStats;

	// Check user role
	if (user.role === "admin") {
		// Admin stats: Fetch all data
		const totalUsers = await User.countDocuments();
		const totalManagers = await User.countDocuments({ role: "manager" });
		const totalTasks = await Task.countDocuments();
		const tasksByStatus = {
			pending: await Task.countDocuments({ status: "pending" }),
			inProgress: await Task.countDocuments({ status: "in-progress" }),
			completed: await Task.countDocuments({ status: "completed" }),
		};

		dashboardStats = {
			totalUsers,
			totalManagers,
			totalTasks,
			tasksByStatus,
		};
	} else if (user.role === "manager") {
		// Manager stats: Fetch stats related to tasks assigned to them
		const totalTasks = await Task.countDocuments({ createdBy: user._id });
		const tasksByStatus = {
			pending: await Task.countDocuments({
				status: "pending",
				createdBy: user._id,
			}),
			inProgress: await Task.countDocuments({
				status: "in-progress",
				createdBy: user._id,
			}),
			completed: await Task.countDocuments({
				status: "completed",
				createdBy: user._id,
			}),
		};

		dashboardStats = {
			totalTasks,
			tasksByStatus,
		};
	} else if (user.role === "user") {
		// User stats: Fetch stats for their own tasks
		const totalTasks = await Task.countDocuments({ createdBy: user._id });
		const tasksByStatus = {
			pending: await Task.countDocuments({
				status: "pending",
				createdBy: user._id,
			}),
			inProgress: await Task.countDocuments({
				status: "in-progress",
				createdBy: user._id,
			}),
			completed: await Task.countDocuments({
				status: "completed",
				createdBy: user._id,
			}),
		};

		dashboardStats = {
			totalTasks,
			tasksByStatus,
		};
	} else {
		// If role is not recognized
		return res.status(403).json({
			status: "fail",
			message: "You do not have permission to access this data.",
		});
	}

	res.status(200).json({
		status: "success",
		doc: dashboardStats,
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
