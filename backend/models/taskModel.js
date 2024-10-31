import { Schema, model } from "mongoose";

const taskSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Please provide the task title."],
			maxlength: [512, "Title cannot exceed 512 characters."],
		},
		description: {
			type: String,
			maxlength: [2048, "Description cannot exceed 2048 characters."],
		},
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Please specify the creator of the task."],
		},
		status: {
			type: String,
			enum: {
				values: ["pending", "in-progress", "completed"],
				message:
					"Status must be either 'pending', 'in-progress', or 'completed'.",
			},
			default: "pending",
		},
	},
	{ timestamps: true }
);

// Auto-set start date when status changes to 'in-progress'
taskSchema.pre("save", function (next) {
	if (
		this.isModified("status") &&
		this.status === "in-progress" &&
		!this.actualStartDate
	) {
		this.actualStartDate = Date.now();
	}
	next();
});

taskSchema.pre(/^find/, function (next) {
	this.populate("createdBy", "firstName lastName role");
	next();
});

const Task = model("Task", taskSchema);

export default Task;
