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
		<Layout>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				collapsed={collapsed}
				onCollapse={(collapsed) => setCollapsed(collapsed)}
			>
				<Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
			</Sider>
			<Layout>
				<Header
					profileMenuItems={profileMenuItems}
					toggleSidebar={toggleSidebar}
				/>
				<Content
					style={{
						margin: "24px 16px 0",
						padding: 24,
						minHeight: 360,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
						height: "80vh",
					}}
				>
					<Outlet />
				</Content>
				<Footer style={{ textAlign: "center" }}>
					Task Management ©{new Date().getFullYear()} Develop by Naimat Ullah
				</Footer>
			</Layout>
		</Layout>
	);
};

export default DashboardLayout;
