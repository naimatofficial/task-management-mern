import { createBrowserRouter } from "react-router-dom";
import adminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";

const router = createBrowserRouter([...adminRoutes, ...authRoutes]);

export default router;
// import AdminDashboard from "../pages/Dashboard/AdminDashboard";
// import AdminLayout from "../layouts/AdminLayout";
// import ManagerDashboard from "../pages/Dashboard/ManagerDashboard";
// import ManagerLayout from "../layouts/ManagerLayout";
// import UserDashboard from "../pages/Dashboard/UserDashboard";
// import UserLayout from "../layouts/UserLayout";

// import useAuth from "./hooks/useAuth";

// const RoleBasedLayout = ({ allowedRole, LayoutComponent }) => {
// 	// const { role } = useAuth();
// 	let role = "manager";

// 	console.log(allowedRole);

// 	if (role === allowedRole) {
// 		console.log("role access");
// 		return <LayoutComponent />;
// 	}
// 	return <Navigate to="/" replace />; // Redirect if the role doesn't match
// };

// const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: (
// 			<RoleBasedLayout allowedRole="admin" LayoutComponent={AdminLayout} />
// 		),
// 		children: [
// 			{
// 				path: "",
// 				element: <AdminDashboard />,
// 			},
// 		],
// 	},
// 	{
// 		path: "/",
// 		element: (
// 			<RoleBasedLayout allowedRole="manager" LayoutComponent={ManagerLayout} />
// 		),
// 		children: [
// 			{
// 				path: "",
// 				element: <ManagerDashboard />,
// 			},
// 		],
// 	},
// 	{
// 		path: "/",
// 		element: (
// 			<RoleBasedLayout allowedRole="user" LayoutComponent={UserLayout} />
// 		),
// 		children: [
// 			{
// 				path: "",
// 				element: <UserDashboard />,
// 			},
// 		],
// 	},
// ]);
