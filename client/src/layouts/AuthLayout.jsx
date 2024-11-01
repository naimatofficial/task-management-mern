import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div className="bg-gradient-to-r from-blue-500 to-purple-600 w-full h-screen flex items-center justify-center p-4">
			<div className="bg-white w-full max-w-md p-8 rounded-lg shadow-2xl">
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
					Welcome Back
				</h2>
				<p className="text-center text-gray-600 mb-8">
					Please sign in to your account
				</p>
				<Outlet />
				<p className="text-center text-sm text-gray-400 mt-6">
					Developed by Naimat Ullah
				</p>
			</div>
		</div>
	);
};

export default AuthLayout;
