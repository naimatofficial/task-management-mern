import express from "express";
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "./../controllers/userController.js";

import checkObjectId from "../middleware/checkObjectId.js";
import { protect, restrictTo } from "./../middleware/authMiddleware.js";
import { login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", protect, logout);

router.route("/").post(protect, restrictTo("admin"), createUser).get(getUsers);

router
	.route("/:id", checkObjectId)
	.get(protect, getUser)
	.put(protect, updateUser)
	.delete(protect, restrictTo("admin"), deleteUser);

export default router;
