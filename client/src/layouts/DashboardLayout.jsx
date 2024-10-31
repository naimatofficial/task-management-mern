import { Layout, theme } from "antd";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "./../hooks/useAuth";
import Loader from "./../components/shared/Loader";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";

const { Content, Footer, Sider } = Layout;

const DashboardLayout = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const [collapsed, setCollapsed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [role, setRole] = useState(null);

	const navigate = useNavigate();
	const user = useAuth();

	useEffect(() => {
		if (!user) {
			navigate("/auth/login");
		} else if (user) {
			setRole(user?.role);
		}

		setIsLoading(false);
	}, [navigate, user]);

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		window.location.href = "/auth/login";
	};

	const handleProfile = () => {
		navigate("/users/profile"); // Redirect to the user profile page
	};

	const profileMenuItems = [
		{ key: "1", label: "Profile", onClick: handleProfile },
		{ key: "2", label: "Logout", onClick: handleLogout },
	];

	// Toggle function for sidebar
	const toggleSidebar = () => {
		setCollapsed(!collapsed);
	};

	return isLoading ? (
		<div className="flex justify-center items-center">
			<Loader />
		</div>
	) : (
		<Layout style={{ height: "100vh", overflow: "hidden" }}>
			{" "}
			{/* Ensures the layout fills the viewport */}
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				collapsed={collapsed}
				onCollapse={(collapsed) => setCollapsed(collapsed)}
				style={{
					position: "fixed",
					height: "100vh",
					overflow: "auto",
				}}
			>
				<Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
			</Sider>
			{/* Main layout shift for content beside the sidebar */}
			<Layout
				style={{
					marginLeft: collapsed ? 0 : 200, // Adjust based on the sidebar's width when expanded
					paddingTop: "0px",
					height: "100vh",
					overflow: "hidden", // Prevents overflow of the full layout
				}}
			>
				<Header
					profileMenuItems={profileMenuItems}
					toggleSidebar={toggleSidebar}
					style={{
						position: "fixed",
						top: 0,
						width: `calc(100% - ${collapsed ? "0" : "200px"})`, // Adjust width based on sidebar
						zIndex: 10,
					}}
				/>
				{/* Content layout that scrolls only when overflow occurs */}
				<Content
					style={{
						margin: "24px 16px 0",
						padding: 24,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
						overflowY: "auto",
						height: "calc(100vh - 88px)", // Adjust for header and margin
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default DashboardLayout;
