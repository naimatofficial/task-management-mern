import dotenv from "dotenv";

dotenv.config();

const keys = {
	port: process.env.PORT || 3000,
	nodeENV: process.env.NODE_ENV,

	// Database
	dbURI: process.env.DB_URI,

	// JWT Keys
	jwtSecret: process.env.JWT_SECRET,
	refreshSecret: process.env.JWT_REFRESH_SECRET,

	accessTokenExpiresIn: process.env.JWT_ACCESS_TIME,
	refreshTokenExpiresIn: process.env.JWT_REFRESH_TIME,

	accessCookieExpiresIn: process.env.JWT_ACCESS_COOKIE_EXPIRES_IN,
	refreshCookieExpiresIn: process.env.JWT_REFRESH_COOKIE_EXPIRES_IN,
};

export default keys;
