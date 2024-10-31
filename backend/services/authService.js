import jwt from "jsonwebtoken";
import keys from "../config/keys.js";

function generateAccessToken(userId, role) {
	return jwt.sign({ userId, role }, keys.jwtSecret, {
		expiresIn: keys.accessTokenExpiresIn,
	});
}

function generateRefreshToken(userId, role) {
	return jwt.sign({ userId, role }, keys.jwtSecret, {
		expiresIn: keys.refreshTokenExpiresIn,
	});
}

export async function loginService(user) {
	const accessToken = generateAccessToken(user._id, user.role);
	const refreshToken = generateRefreshToken(user._id, user.role);

	return { accessToken, refreshToken };
}

export function verifyRefreshToken(token) {
	try {
		return jwt.verify(token, config.refreshSecret);
	} catch (err) {
		return null;
	}
}
