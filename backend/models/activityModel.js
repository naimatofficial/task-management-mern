import { Schema, model } from "mongoose";

const activitySchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		taskId: {
			type: Schema.Types.ObjectId,
			ref: "Task",
			required: true,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
			required: true,
			maxlength: 512,
		},
		status: {
			type: String,
			enum: ["pending", "in-progress", "completed"],
			default: "pending",
		},
		description: {
			type: String,
			maxlength: 2048,
		},
	},
	{ timestamps: true }
);

// Populate user and task in Activity
activitySchema.pre(/^find/, function (next) {
	this.populate("userId", "firstName lastName role")
		.populate("taskId", "title status")
		.populate("createdBy", "firstName lastName");
	next();
});

const Activity = model("Activity", activitySchema);
