import { model, Schema } from "mongoose";

const taskAssignmentSchema = new Schema({
	task: {
		type: Schema.Types.ObjectId,
		ref: "Task",
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Please specify the assigned user."],
	},
	manager: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Please specify the creator of the task."],
	},
	assignedAt: {
		type: Date,
		default: Date.now,
	},
});

taskAssignmentSchema.pre(/^find/, function (next) {
	this.populate("user", "firstName lastName role")
		.populate("manager", "firstName lastName role")
		.populate("task", "-__v");
	next();
});

const TaskAssignment = model("TaskAssignment", taskAssignmentSchema);

export default TaskAssignment;
