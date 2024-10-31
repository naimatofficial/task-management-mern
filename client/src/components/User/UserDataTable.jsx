import PropTypes from "prop-types";
import { message, Tag } from "antd";
import { useDeleteUserMutation } from "../../redux/slice/userSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmModal from "./../shared/DeleteConfirmModal";
import ActionMenu from "./../shared/ActionMenu";
import DataTable from "../shared/DataTable";

const UserDataTable = ({ data, refetch }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [userId, setUserId] = useState(null);
	const [current, setCurrent] = useState(1);

	const pageSize = 5;

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
		navigate(`/users/profile?userId=${id}`);
	};

	const handleDeleteUser = async () => {
		try {
			if (userId) {
				await deleteUser(userId).unwrap();
				setIsModalVisible(false);
				message.success("User deleted successfully.");
				setUserId(null);
			}
		} catch (err) {
			console.error("Error deleting:", err);
			message.error(err.data.message || "User is not deleted.");
		}
	};

	const columns = [
		{
			title: "S.No",
			dataIndex: "index",
			key: "index",
			render: (_, __, index) => index + 1 + (current - 1) * pageSize,
			className: "text-center",
			width: 80,
		},
		{
			title: "Name",
			dataIndex: "firstName",
			key: "name",
			render: (_, record) => {
				// Get the first character of the first name
				const initial = record.firstName.charAt(0).toUpperCase();

				return (
					<div style={{ display: "flex", alignItems: "center" }}>
						<div
							style={{
								width: "35px",
								height: "35px",
								borderRadius: "50%",
								backgroundColor: "#6688",
								color: "white",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginRight: "10px",
								fontWeight: "bold",
								fontSize: "16px",
							}}
						>
							{initial}
						</div>
						<span>{`${record.firstName} ${
							record.lastName ? record.lastName : ""
						}`}</span>
					</div>
				);
			},
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Role",
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
				return (
					<Tag color={color} className={`rounded-full font-bold capitalize`}>
						{role.toUpperCase()}
					</Tag>
				);
			},
			width: 100,
		},
		{
			title: "Assign",
			key: "assign",
			render: (_, record) => (
				<div className="flex justify-center">
					<Link to={`/tasks/assign/${record._id}`} className="text-blue-500">
						Assign
					</Link>
				</div>
			),
			className: "text-center",
			width: 100,
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, record) => (
				<div className="flex justify-center gap-2">
					<ActionMenu
						recordId={record._id}
						onEdit={() => handleEdit(record._id)}
						onView={() => handleView(record._id)}
						onDelete={() => showModal(record._id)}
					/>
				</div>
			),
			className: "text-center",
			width: 100,
		},
	];

	return (
		<>
			<DataTable
				data={data}
				columns={columns}
				current={current}
				setCurrent={setCurrent}
				pageSize={pageSize}
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

UserDataTable.propTypes = {
	data: PropTypes.array.isRequired,
	refetch: PropTypes.func.isRequired,
};

export default UserDataTable;
