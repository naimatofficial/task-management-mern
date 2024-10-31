import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
	FaUser,
	FaTachometerAlt,
	FaTasks,
	FaUsers,
	FaClipboardCheck,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";

// Define sidebar items with roles
const sidebarItems = [
	{
		icon: FaTachometerAlt,
		label: "Dashboard",
		path: "/",
		roles: ["admin", "manager", "user"],
	},
	{
		icon: FaUsers,
		label: "Users",
		path: "/users",
		roles: ["admin", "manager"],
	},
	{
		icon: FaTasks,
		label: "All Tasks",
		path: "/tasks",
		roles: ["admin", "manager", "user"],
	},
	{
		icon: FaClipboardCheck,
		label: "Task Assigns",
		path: "/task/assigns",
		roles: ["admin", "manager"],
	},
	{
		icon: FaUser,
		label: "Profile",
		path: "/users/profile",
		roles: ["admin", "manager", "user"],
	},
];

const Sidebar = () => {
	// Get the current user role
	const user = useAuth();
	const userRole = user?.role || "user";

	// Filter and update items based on user role
	const filteredItems = sidebarItems
		.filter((item) => item.roles.includes(userRole))
		.map((item) => {
			// Change label to "My Tasks" if the role is "user" or "manager" and the label is "Tasks"
			if (
				item.label === "All Tasks" &&
				(userRole === "user" || userRole === "manager")
			) {
				return { ...item, label: "My Tasks" };
			}
			return item;
		});

	return (
		<div style={{ height: "100%" }}>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
				{filteredItems.map((item, index) => (
					<Menu.Item key={index} icon={<item.icon />}>
						<Link to={item.path}>{item.label}</Link>
					</Menu.Item>
				))}
			</Menu>
		</div>
	);
};

export default Sidebar;
