import PropTypes from "prop-types";
import { message, Table, Tag } from "antd";
import { useDeleteUserMutation } from "../../redux/slice/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmModal from "./../shared/DeleteConfirmModal";
import ActionMenu from "./../shared/ActionMenu";

const UserTable = ({ data, refetch }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [userId, setUserId] = useState(null);

	const [deleteUser, { isSuccess: isDeletingSuccess }] =
		useDeleteUserMutation();

	const navigate = useNavigate();

	useEffect(() => {
		if (isDeletingSuccess) {
			refetch();
		}
	}, [isDeletingSuccess, refetch]);

	const showModal = (id) => {
		setIsModalVisible(true);
		setUserId(id);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleEdit = (id) => {
		navigate(`/users/edit/${id}`);
	};

	const handleView = (id) => {
		navigate(`/users/${id}`);
	};

	const handleDeleteUser = async () => {
		try {
			if (userId) {
				await deleteUser(userId);
				setIsModalVisible(false);
				message.success("User deleted successfully.");
				setUserId(null);
			}
		} catch (err) {
			console.error("Error deleting:", err);
			message.error("User is not deleted.");
		}
	};

	const columns = [
		{
			title: "S.No",
			dataIndex: "index",
			key: "index",
			render: (_, __, index) => index + 1,
			className: "text-center",
			width: 80,
		},
		{
			title: `Name`,
			dataIndex: `firstName`,
			key: "name",
			render: (_, record) =>
				`${record.firstName} ${record.lastName ? record.lastName : ""}`,
		},
		{
			title: `Email`,
			dataIndex: "email",
			key: "email",
		},
		{
			title: `Role`,
			dataIndex: "role",
			key: "role",
			render: (role) => {
				let color;
				switch (role) {
					case "admin":
						color = "volcano";
						break;
					case "user":
						color = "green";
						break;
					case "manager":
						color = "geekblue";
						break;
					default:
						color = "gray";
				}
				return <Tag color={color}>{role.toUpperCase()}</Tag>;
			},
			width: 100,
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, record) => (
				<div className="flex justify-center gap-2">
					<ActionMenu
						recordId={record._id}
						onEdit={handleEdit}
						onView={handleView}
						onDelete={showModal}
					/>
				</div>
			),
			className: "text-center",
			width: 100,
		},
	];

	return (
		<>
			<Table
				dataSource={data}
				columns={columns}
				rowKey={(record) => record._id}
				sticky
				pagination={false}
				virtual
			/>

			{/* Delete confirmation modal */}
			<DeleteConfirmModal
				isModalVisible={isModalVisible}
				handleCancel={handleCancel}
				handleOk={handleDeleteUser}
			/>
		</>
	);
};

UserTable.propTypes = {
	data: PropTypes.array.isRequired,
	refetch: PropTypes.func.isRequired,
};

export default UserTable;
