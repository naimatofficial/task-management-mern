import bcrypt from "bcryptjs";

import keys from "../config/keys.js";
import User from "../models/userModel.js";

import catchAsync from "../utils/catchAsync.js";
import AppError from "./../utils/appError.js";
import { loginService } from "../services/authService.js";
import connectDB from "../config/db.js";

const createSendToken = catchAsync(async (user, statusCode, res) => {
	const { accessToken, refreshToken } = await loginService(user);

	// Access token cookie options
	const accessCookieOptions = {
		expires: new Date(
			Date.now() + keys.accessCookieExpiresIn * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		secure: keys.nodeENV === "production",
	};

	// Refresh token cookie options
	const refreshCookieOptions = {
		expires: new Date(
			Date.now() + keys.refreshCookieExpiresIn * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		secure: keys.nodeENV === "production",
	};

	// Set cookies
	res.cookie("jwt", accessToken, accessCookieOptions);
	res.cookie("refreshJwt", refreshToken, refreshCookieOptions);

	// do not show the password to client side
	user.password = undefined;

	res.status(statusCode).json({
		status: "success",
		accessToken,
		user,
	});
});

export const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// 1) Check if email and password exists
	if (!email || !password) {
		return next(new AppError("Please provide email and password", 400));
	}

	// 2) Check the user exists && password is correct
	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new AppError("Invalid email or password", 400));
	}

	const correctPassword = await bcrypt.compare(password, user.password);

	if (!correctPassword) {
		return next(new AppError("Invalid email or password", 400));
	}

	// 3) If everything is Ok, then send the response to client
	createSendToken(user, 200, res);
});

export const register = catchAsync(async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;

	const newUser = await User.create({
		firstName,
		lastName,
		email,
		password,
	});

	createSendToken(newUser, 201, res);
});

export const logout = catchAsync(async (req, res, next) => {
	// Clear both jwt and refreshJwt cookies
	res.clearCookie("jwt", {
		httpOnly: true,
		secure: keys.nodeENV === "production",
		sameSite: "Strict",
	});

	res.clearCookie("refreshJwt", {
		httpOnly: true,
		secure: keys.nodeENV === "production",
		sameSite: "Strict",
	});

	res.status(200).json({
		status: "success",
		message: "Logout successfully",
	});
});

export const refreshAccessToken = catchAsync(async (req, res, next) => {
	const refreshToken = req.cookies.refreshJwt;
	if (!refreshToken) {
		return res.status(403).json({ message: "Refresh token not provided" });
	}

	try {
		const decoded = jwt.verify(refreshToken, config.refreshSecret);
		const newAccessToken = jwt.sign(
			{ userId: decoded.userId, role: decoded.role },
			config.jwtSecret,
			{ expiresIn: config.jwtAccessTime }
		);

		// Set new access token in cookie
		res.cookie("jwt", newAccessToken, {
			expires: new Date(
				Date.now() + process.env.JWT_ACCESS_COOKIE_EXPIRES_IN * 60 * 1000
			),
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});

		res.status(200).json({ status: "success", accessToken: newAccessToken });
	} catch (error) {
		return res.status(403).json({ message: "Invalid refresh token" });
	}
});
