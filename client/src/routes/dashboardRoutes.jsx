import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import AddTaskPage from "../pages/Task/AddTaskPage";
import EditTaskPage from "../pages/Task/EditTaskPage";
import TasksPage from "../pages/Task/TasksPage";
import AddTaskAssignPage from "../pages/TaskAssign/AssignTaskToUserPage";
import EditTaskAssignPage from "../pages/TaskAssign/EditAssignTaskPage";
import TaskAssignPage from "../pages/TaskAssign/TaskAssignPage";
import AddUserPage from "../pages/User/AddUserPage";
import EditUserPage from "../pages/User/EditUserPage";
import UsersPage from "../pages/User/UsersPage";
import UserProfile from "../pages/User/UserProfile";

const dashboardRoutes = [
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
				path: "/users/edit/:id",
				element: <EditUserPage />,
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
				path: "/tasks/edit/:id",
				element: <EditTaskPage />,
			},
			{
				path: "/task/assigns",
				element: <TaskAssignPage />,
			},
			{
				path: "/task/assigns/add",
				element: <AddTaskAssignPage />,
			},
			{
				path: "/task/assigns/edit/:id",
				element: <EditTaskAssignPage />,
			},
		],
	},
];

export default dashboardRoutes;
