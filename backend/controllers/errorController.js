import AppError from "./../utils/appError.js";

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
	const valueMatch = err.message.match(/(["'])(.*?)\1/);
	const value = valueMatch ? valueMatch[0] : "";
	const message = `Duplicate field value ${value}, please use another value.`;
	return new AppError(message, 400);
};

const handleJWTTokenError = () => {
	const message = `Invalid or expired token. Please log in again`;
	return new AppError(message, 401);
};

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data: ${errors.join(". ")}`;

	return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	// Operational, trusted error: send message to client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		// Programming or other unknown error
		res.status(500).json({
			status: "error",
			message: "Something went very wrong!",
		});
	}
};

export default (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV === "production") {
		let error;

		if (err.name === "CastError") {
			error = handleCastErrorDB(err);
		}
		if (err.code === 11000) {
			error = handleDuplicateFieldDB(err);
		}
		if (err.name === "ValidationError") {
			error = handleValidationErrorDB(err);
		}
		if (err.name === "JsonWebTokenError") {
			error = handleJWTTokenError();
		}
		if (error) {
			sendErrorProd(error, res);
		} else {
			sendErrorProd(err, res);
		}
	}
};
