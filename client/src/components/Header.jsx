import PropTypes from "prop-types";
import { Layout, Dropdown, Avatar, Menu, Space, Button } from "antd";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const { Header: AntHeader } = Layout;

const Header = ({ profileMenuItems, toggleSidebar }) => {
	const { userInfo } = useSelector((state) => state.auth);

	const backgroundColor = userInfo?.avatarBg || "#888";

	const name = `${userInfo?.user?.firstName || ""} ${
		userInfo?.user?.lastName || ""
	}`.trim();

	const avatarIcon = userInfo?.user?.firstName.charAt(0).toUpperCase() || (
		<FaUserCircle />
	);

	return (
		<AntHeader
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "0 24px",
				background: "#fff",
			}}
		>
			<Button
				type="text"
				icon={<FaBars />}
				onClick={toggleSidebar}
				style={{ fontSize: "18px", marginRight: "16px", color: "#000" }}
			/>
			<h1 className="text-xl font-bold text-gray-800 mb-0">
				👋 Welcome {name}
			</h1>
			<div className="logo" />
			<Dropdown
				menu={<Menu items={profileMenuItems} />}
				trigger={["click"]}
				placement="bottomRight"
			>
				<Space>
					<Avatar className="cursor-pointer" style={{ backgroundColor }}>
						{avatarIcon}
					</Avatar>
				</Space>
			</Dropdown>
		</AntHeader>
	);
};

Header.propTypes = {
	profileMenuItems: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
