import { Layout, message, Spin, theme } from "antd";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import useAuth from "./../hooks/useAuth";
import Loader from "./../components/shared/Loader";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useLogoutUserMutation } from "../redux/slice/userSlice";

const { Content, Sider } = Layout;

const DashboardLayout = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const [collapsed, setCollapsed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [logoutUser, { isLoading: isLogoutLoading }] = useLogoutUserMutation();

	const navigate = useNavigate();
	const user = useAuth();

	useEffect(() => {
		if (!user) {
			navigate("/auth/login");
		}

		setIsLoading(false);
	}, [navigate, user]);

	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			const userInfo = localStorage.getItem("userInfo");
			const user = JSON.parse(userInfo);

			await logoutUser(user?.accessToken);
			dispatch(logout());
			message.success("Logout successfully");

			navigate("/auth/login", { replace: true });
		} catch (error) {
			message.error(error?.data?.message);
		}
	};

	const handleProfile = () => {
		navigate("/users/profile");
	};

	const profileMenuItems = [
		{ key: "1", icon: <FaUser />, label: "Profile", onClick: handleProfile },
		{
			key: "2",
			icon: <FaSignOutAlt />,
			label: "Logout",
			onClick: handleLogout,
		},
	];

	const toggleSidebar = () => {
		setCollapsed(!collapsed);
	};

	return isLoading || isLogoutLoading ? (
		<div className="flex justify-center items-center">
			<Loader />
		</div>
	) : (
		<Layout style={{ height: "100vh", overflow: "hidden" }}>
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
			<Layout
				style={{
					marginLeft: collapsed ? 0 : 200,
					paddingTop: "0px",
					height: "100vh",
					overflow: "hidden",
				}}
			>
				<Header
					profileMenuItems={profileMenuItems}
					toggleSidebar={toggleSidebar}
					style={{
						position: "fixed",
						top: 0,
						width: `calc(100% - ${collapsed ? "0" : "200px"})`,
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
						height: "calc(100vh - 88px)",
					}}
				>
					<Suspense fallback={<Spin size="large" />}>
						<Outlet />
					</Suspense>
				</Content>
			</Layout>
		</Layout>
	);
};

export default DashboardLayout;
