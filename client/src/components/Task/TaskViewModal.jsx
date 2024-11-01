/* eslint-disable react/prop-types */
import { Modal, Typography, Tag, Col, Row } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const TaskViewModal = ({ visible, onClose, task }) => {
	return (
		<Modal
			title="Task Details"
			visible={visible}
			onCancel={onClose}
			footer={null}
			width={800}
		>
			{task ? (
				<div className="border-t-2 p-4">
					<Title level={4} style={{ marginBottom: 16 }}>
						{task.title}
					</Title>

					<div className="mb-4">
						<Text strong style={{ fontSize: "16px" }}>
							Status:{" "}
						</Text>
						<Tag
							color={getStatusColor(task.status)}
							className="uppercase rounded-full p-1 px-2 font-bold"
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
				</div>
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
