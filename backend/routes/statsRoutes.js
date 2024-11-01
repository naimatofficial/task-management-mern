import express from "express";
import {
	getDashboardStats,
	getUserStats,
} from "../controllers/statsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, getDashboardStats);
router.get("/user/:userId", getUserStats);

export default router;
