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

export const signup = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body;

	const newUser = await User.create({
		name,
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

// export const forgotPassword = catchAsync(async (req, res, next) => {
//    // 1) Get user based on posted email
//    const email = req.body.email
//    const user = await Customer.findOne({ email })
//    if (!user) {
//       return next(
//          new AppError('There is no user with that email address.', 404)
//       )
//    }

//    // 2) Generate the random reset token
//    const resetToken = user.createPasswordResetToken()
//    await user.save({ validateBeforeSave: false })

//    // 3) Send it to user's email
//    try {
//       const resetURL = `http://localhost:3000/users/resetPassword/${resetToken}`

//       // Get the user's IP address
//       const ipAddress = req.ip
//       const timestamp =
//          new Date().toISOString().replace('T', ' ').substring(0, 16) + ' GMT'

//       const message = createPasswordResetMessage(
//          user.email,
//          ipAddress,
//          timestamp,
//          resetURL
//       )

//       await sendEmail({
//          email: user.email,
//          subject: 'Your password reset token (valid for 10 min)!',
//          html: message,
//       })

//       res.status(200).json({
//          status: 'success',
//          message: 'Token sent to email!',
//       })
//    } catch (err) {
//       user.passwordResetToken = undefined
//       user.passwordResetExpires = undefined
//       await user.save({ validateBeforeSave: false })

//       return next(
//          new AppError(
//             'There was an error sending the email. Try again later!',
//             500
//          )
//       )
//    }
// })

// export const resetPassword = catchAsync(async (req, res, next) => {
//    // 1) Create a hashedToken
//    const { passwordNew, passwordConfirm } = req.body

//    if (passwordNew !== passwordConfirm) {
//       return next(new AppError('Passwords not matched!', 400))
//    }

//    const hashedToken = crypto
//       .createHash('sha256')
//       .update(req.params.token)
//       .digest('hex')

//    // 2) Check the user exists and also check password reset expires is greater then current time
//    const user = await Customer.findOne({
//       passwordResetToken: hashedToken,
//       passwordResetExpires: { $gt: Date.now() },
//    })

//    if (!user) {
//       return next(new AppError('Token is invalid or has expired', 400))
//    }

//    // 3) Set email message
//    const ipAddress = req.ip // Get the user's IP address
//    const timestamp =
//       new Date().toISOString().replace('T', ' ').substring(0, 16) + ' GMT'

//    const message = createPasswordResetConfirmationMessage(
//       user.email,
//       ipAddress,
//       timestamp
//    )

//    // 3) Update the user properties & remove the unnecessary fields
//    user.password = passwordNew
//    user.passwordResetToken = undefined
//    user.passwordResetExpires = undefined
//    await user.save()

//    await sendEmail({
//       email: user.email,
//       subject: 'Password Reset Confirmation',
//       html: message,
//    })

//    createSendToken(user, 200, res)
// })

// export const updatePassword = catchAsync(async (req, res, next) => {
//    // 1) Get the Model & find the user with including password
//    const Model = req.Model
//    const user = await Model.findById(req.user._id).select('+password')

//    // 2) Check the Posted current password is correct
//    const correct = await user.correctPassword(
//       req.body.passwordCurrent,
//       user.password
//    )

//    if (!correct) {
//       return next(new AppError('Your current password is wrong.', 401))
//    }

//    // 3) If so, update the password
//    user.password = req.body.passwordNew
//    await user.save()

//    // 4) send JWT
//    createSendToken(user, 200, res)
// })
