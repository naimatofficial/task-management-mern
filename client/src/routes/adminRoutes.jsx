import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import AddTaskPage from "../pages/Task/AddTaskPage";
import TasksPage from "../pages/Task/TasksPage";
import TaskAssignPage from "../pages/TaskAssign/TaskAssignPage";
import AddUserPage from "../pages/User/AddUserPage";
import UsersPage from "../pages/User/UserPage";
import UserProfile from "../pages/User/UserProfile";

const adminRoutes = [
	{
		path: "/",
		element: <DashboardLayout />,
		children: [
			{
				path: "/",
				element: <Dashboard />,
			},
			{
				path: "/add-user",
				element: <AddUserPage />,
			},
			{
				path: "/users",
				element: <UsersPage />,
			},
			{
				path: "/users/profile",
				element: <UserProfile />,
			},
			{
				path: "/tasks",
				element: <TasksPage />,
			},
			{
				path: "/add-task",
				element: <AddTaskPage />,
			},
			{
				path: "/task/assigns",
				element: <TaskAssignPage />,
			},
		],
	},
];

export default adminRoutes;
