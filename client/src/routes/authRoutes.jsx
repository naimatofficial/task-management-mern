import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../pages/Auth/LoginForm";

const authRoutes = [
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "login",
				element: <LoginForm />,
			},
		],
	},
];

export default authRoutes;
