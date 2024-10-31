import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";

// ROUTES
import routes from "./routes/index.js";

import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import connectDB from "./config/db.js";

const app = express();

// Connect MongoDB
connectDB();

const corsOptions = {
	// Allows all origins, CORS will reflect the requesting origin
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};

// Security headers first
app.use(helmet());
// CORS setup before request handling
app.use(cors(corsOptions));
// Parse JSON request body early
app.use(express.json());
// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// Parse cookies before using them (e.g., for auth)
app.use(cookieParser());
// Sanitize the request after body and cookies are parsed
app.use(ExpressMongoSanitize());

// Developing logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		message: "🧑‍💻Task Management API is running successfully",
		timestamp: new Date().toISOString(),
		version: "1.0.0",
	});
});

// API ROUTES
app.use("/api", routes);

// Unhandled Routes Handling Middleware
app.all("*", (req, res, next) => {
	next(new AppError(`Can't find this ${req.originalUrl} on this server.`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app;
