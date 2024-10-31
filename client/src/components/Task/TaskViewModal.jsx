/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Typography, Tag, Select, Button, Col, Row } from "antd";
import dayjs from "dayjs"; // Optional: For formatting dates
import { useGetUsersQuery } from "../../redux/slice/userSlice";
import Loader from "../shared/Loader";

const { Title, Text } = Typography;
const { Option } = Select;

const TaskViewModal = ({ visible, onClose, task, onAssign }) => {
	const [selectedUser, setSelectedUser] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	const { data: users, isLoading } = useGetUsersQuery({});

	const filteredUsers = users?.doc?.filter((user) =>
		user.firstName.toLowerCase()?.includes(searchTerm?.toLowerCase())
	);

	const handleAssign = () => {
		if (selectedUser) {
			onAssign(task._id, selectedUser);
			setSelectedUser(null);
			onClose();
		}
	};

	return (
		<Modal
			title="Task Details"
			visible={visible}
			onCancel={onClose}
			footer={null}
			width={800} // Increased width for better UI
		>
			{task ? (
				<>
					<Title level={4} style={{ marginBottom: 16 }}>
						{task.title}
					</Title>

					<div className="mb-4">
						<Text strong style={{ fontSize: "16px" }}>
							Status:{" "}
						</Text>
						<Tag
							color={getStatusColor(task.status)}
							style={{ fontSize: "16px" }}
							className="uppercase"
						>
							{task.status}
						</Tag>
					</div>

					<Row gutter={16} style={{ marginBottom: 16 }}>
						<Col span={8}>
							<Text strong style={{ fontSize: "16px" }}>
								Start Date:{" "}
							</Text>
							<Text style={{ fontSize: "16px" }}>
								{dayjs(task.startDate).format("DD MMMM YYYY")}
							</Text>
						</Col>
						<Col span={8}>
							<Text strong style={{ fontSize: "16px" }}>
								End Date:{" "}
							</Text>
							<Text style={{ fontSize: "16px" }}>
								{dayjs(task.endDate).format("DD MMMM YYYY")}
							</Text>
						</Col>
					</Row>

					<Text strong style={{ fontSize: "16px", paddingBottom: "10px" }}>
						Assign to User
					</Text>
					<Select
						placeholder="Select a user"
						style={{ width: "100%" }}
						onChange={(value) => setSelectedUser(value)}
						value={selectedUser}
					>
						{filteredUsers.map((user) => (
							<Option key={user.id} value={user.id}>
								{user.name}
							</Option>
						))}
					</Select>
					<div style={{ marginTop: "16px", textAlign: "right" }}>
						<Button
							type="primary"
							onClick={handleAssign}
							disabled={!selectedUser}
						>
							Assign Task
						</Button>
					</div>
				</>
			) : (
				<Text>No task details available.</Text>
			)}
		</Modal>
	);
};

// Helper function to determine the color based on status
const getStatusColor = (status) => {
	switch (status) {
		case "pending":
			return "volcano";
		case "in-progress":
			return "blue";
		case "completed":
			return "green";
		default:
			return "gray";
	}
};

export default TaskViewModal;
