import { promisify } from "util";
import jwt from "jsonwebtoken";

import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js";

import User from "../models/userModel.js";
import keys from "../config/keys.js";

import { verifyRefreshToken } from "./../services/authService.js";

export const protect = catchAsync(async (req, res, next) => {
	let token;

	// 1) Get the access token from headers or cookies
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer ")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		// Support tokens from cookies for session-based auth
		token = req.cookies.jwt;
	}

	// 2) If no access token is found, check for a refresh token
	if (!token) {
		const refreshToken = req.cookies.refreshJwt;

		if (!refreshToken || !token) {
			return next(
				new AppError("You are not logged in! Please log in to get access.", 401)
			);
		}

		// 3) Verify the refresh token
		const decodedRefreshToken = await verifyRefreshToken(refreshToken);
		if (!decodedRefreshToken) {
			return next(
				new AppError(
					"Invalid or expired refresh token. Please log in again.",
					401
				)
			);
		}

		// 4) Reissue a new access token if refresh token is valid
		const newAccessToken = await createAccessToken(decodedRefreshToken);

		// 5) Send the new access token as a cookie
		res.cookie("jwt", newAccessToken, {
			httpOnly: true,
			secure: keys.nodeENV === "production",
			expires: new Date(
				Date.now() + keys.accessCookieExpiresIn * 24 * 60 * 60 * 1000
			),
		});

		// Attach new access token to the request for further processing
		token = newAccessToken;
	}

	// 6) Verify the access token
	const decoded = await promisify(jwt.verify)(token, keys.jwtSecret);

	console.log(decoded);

	// 7) Check if the user still exists
	const currentUser = await User.findById(decoded.userId);

	if (!currentUser) {
		return next(
			new AppError("The user belonging to this token no longer exists.", 401)
		);
	}

	// 10) Check if the user has changed their password after token was issued
	if (
		currentUser.changePasswordAfter &&
		currentUser.changePasswordAfter(decoded.iat)
	) {
		return next(
			new AppError("User recently changed password! Please log in again.", 401)
		);
	}

	// 11) Attach user to the request object for further use
	req.user = currentUser;

	// 12) Proceed to the next middleware
	next();
});
// restrictTo is a Wrapper function to return the middleware function
export const restrictTo = (...roles) => {
	return (req, res, next) => {
		console.log(req.user.role);
		if (!roles.includes(req.user?.role)) {
			return next(
				new AppError("You do not have permission to perform this action.", 403)
			); // 403: Forbiden
		}

		next();
	};
};
