import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes";
import dashboardRoutes from "./dashboardRoutes";

const router = createBrowserRouter([...dashboardRoutes, ...authRoutes]);

export default router;
