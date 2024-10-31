import PropTypes from "prop-types";
import { Dropdown, Menu } from "antd";
import { FaPen, FaEye, FaTrash, FaEllipsisV } from "react-icons/fa";

const ActionMenu = ({ recordId, onView, onEdit, onDelete }) => {
	const menu = (
		<Menu>
			<Menu.Item key="view" icon={<FaEye />} onClick={() => onView(recordId)}>
				View
			</Menu.Item>
			<Menu.Item key="edit" icon={<FaPen />} onClick={() => onEdit(recordId)}>
				Edit
			</Menu.Item>
			<Menu.Item
				key="delete"
				icon={<FaTrash />}
				onClick={() => onDelete(recordId)}
			>
				Delete
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown overlay={menu} trigger={["click"]}>
			<button className="text-gray-500 border-none shadow-none">
				<FaEllipsisV />
			</button>
		</Dropdown>
	);
};

ActionMenu.propTypes = {
	recordId: PropTypes.string.isRequired,
	onView: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default ActionMenu;
