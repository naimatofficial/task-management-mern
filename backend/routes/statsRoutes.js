import express from "express";
import {
	getDashboardStats,
	getUserStats,
} from "../controllers/statsController.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);
router.get("/user/:userId", getUserStats);

export default router;
