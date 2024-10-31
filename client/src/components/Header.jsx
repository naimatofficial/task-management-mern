import PropTypes from "prop-types";
import { Layout, Dropdown, Avatar, Menu, Space, Button } from "antd";
import { FaBars, FaUserCircle } from "react-icons/fa";

const { Header: AntHeader } = Layout;

const Header = ({ profileMenuItems, toggleSidebar }) => (
	<AntHeader
		style={{
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			padding: "0 16px",
			background: "#fff",
		}}
	>
		{/* Toggle button for mobile */}
		<Button
			type="text"
			icon={<FaBars />}
			onClick={toggleSidebar}
			style={{ fontSize: "18px", marginRight: "16px", color: "#000" }}
		/>
		<div className="logo" />
		<Dropdown
			overlay={<Menu items={profileMenuItems} />}
			trigger={["click"]}
			placement="bottomRight"
		>
			<Space>
				<Avatar icon={<FaUserCircle />} style={{ cursor: "pointer" }} />
			</Space>
		</Dropdown>
	</AntHeader>
);

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
