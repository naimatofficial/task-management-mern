import TaskAssignment from "../models/taskAssignmentModel.js";
import {
	createOne,
	deleteOne,
	getAll,
	getOne,
	updateOne,
} from "./handleFactory.js";

export const createTaskAssignment = createOne(TaskAssignment);
export const getTaskAssignments = getAll(TaskAssignment);
export const getTaskAssignment = getOne(TaskAssignment);
export const deleteTaskAssignment = deleteOne(TaskAssignment);
export const updateTaskAssignment = updateOne(TaskAssignment);
