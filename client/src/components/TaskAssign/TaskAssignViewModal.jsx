/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import { Modal, Typography, Tag, Row, Col, Grid } from "antd";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const TaskAssignViewModal = ({ visible, onClose, taskAssign }) => {
	const screens = useBreakpoint();

	console.log(taskAssign);

	return (
		<Modal
			title="Task Assign Details"
			open={visible}
			onCancel={onClose}
			footer={null}
			width={screens.md ? 800 : "90%"}
			style={{ padding: screens.md ? "24px" : "16px" }}
		>
			{taskAssign ? (
				<div className="border-t-2 p-4">
					<Title level={3} className="mb-4">
						{`${taskAssign?.user?.firstName} ${
							taskAssign?.user?.lastName || ""
						}`}
					</Title>

					<Title level={4} className="mb-4">
						{taskAssign?.task?.title}
					</Title>

					<div className="mb-4">
						<Text strong className="text-base">
							Status:{" "}
						</Text>
						<Tag
							color={getStatusColor(taskAssign?.task?.status)}
							className="uppercase rounded-full px-2 py-1 font-semibold"
							style={{ fontSize: screens.md ? "14px" : "12px" }}
						>
							{taskAssign?.task?.status}
						</Tag>
					</div>

					<Row gutter={16} className="mb-4">
						<Col span={screens.md ? 8 : 12}>
							<Text strong className="text-base">
								Start Date:{" "}
							</Text>
							<Text className="text-base">
								{dayjs(taskAssign?.task?.startDate).format("DD MMMM YYYY")}
							</Text>
						</Col>
						<Col span={screens.md ? 8 : 12}>
							<Text strong className="text-base">
								End Date:{" "}
							</Text>
							<Text className="text-base">
								{dayjs(taskAssign?.task?.endDate).format("DD MMMM YYYY")}
							</Text>
						</Col>
					</Row>
				</div>
			) : (
				<Text>No task assign details available.</Text>
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

export default TaskAssignViewModal;
