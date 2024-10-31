import mongoose from "mongoose";
import keys from "./keys.js";

mongoose.set("strictQuery", false);

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(keys.dbURI);

		console.log(`Mongodb connected: ${connect.connection.host}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}
};

export default connectDB;
