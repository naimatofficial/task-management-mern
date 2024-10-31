import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div className="bg-gray-100 w-full h-screen flex items-center justify-center p-4">
			<div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
