import React, { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import Loader from "./../components/Loader";

const RootLayout = () => {
	return (
		<div className="container mx-auto p-8">
			<div className="my-6">
				<Link
					to="/"
					className="bg-green-200 text-gray-900 py-4 px-8 rounded mb-8"
				>
					Home
				</Link>
			</div>

			{/* Suspense will handle the lazy loading */}
			<Suspense fallback={<Loader />}>
				<Outlet />
			</Suspense>
		</div>
	);
};

export default RootLayout;
