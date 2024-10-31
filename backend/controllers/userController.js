import User from "../models/userModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import {
	createOne,
	deleteOne,
	getAll,
	getOne,
	updateOne,
} from "./handleFactory.js";

export const createUser = createOne(User);

export const getUsers = catchAsync(async (req, res) => {
	const isAdmin = req.user.role === "admin";

	const query = User.find(
		isAdmin ? {} : { role: { $nin: ["admin", "manager"] } }
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

export const getUser = getOne(User);
export const deleteUser = deleteOne(User);
export const updateUser = updateOne(User);
