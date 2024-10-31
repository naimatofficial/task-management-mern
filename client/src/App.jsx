import { Routes, Route } from "react-router-dom";
import { AdminLayout, ManagerLayout, UserLayout } from "./layouts";
import {
	AdminDashboard,
	ManagerDashboard,
	UserDashboard,
} from "./pages/Dashboard";
import Login from "./pages/Auth/Login";

function App() {
	// Assume `role` is derived from authenticated user info (e.g., context, hook)
	const role = "admin"; // Placeholder

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			{role === "admin" && (
				<Route element={<AdminLayout />}>
					<Route path="/" element={<AdminDashboard />} />
					{/* More admin-specific routes */}
				</Route>
			)}
			{role === "manager" && (
				<Route element={<ManagerLayout />}>
					<Route path="/" element={<ManagerDashboard />} />
					{/* More manager-specific routes */}
				</Route>
			)}
			{role === "user" && (
				<Route element={<UserLayout />}>
					<Route path="/" element={<UserDashboard />} />
					{/* More user-specific routes */}
				</Route>
			)}
		</Routes>
	);
}

export default App;
