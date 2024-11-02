import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, message, Tag, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import DeleteConfirmModal from "./../shared/DeleteConfirmModal";
import ActionMenu from "./../shared/ActionMenu";
import DataTable from "../shared/DataTable";
import { useDeleteTaskAssignMutation } from "../../redux/slice/taskAssignSlice";
import moment from "moment";
import { FaSearchPlus } from "react-icons/fa";
import TaskAssignViewModal from "./TaskAssignViewModal";
const { RangePicker } = DatePicker;

const TaskAssignDataTable = ({ data, refetch, user }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [viewModalVisible, setViewModalVisible] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [taskAssignId, setTaskAssignId] = useState(null);
	const [current, setCurrent] = useState(1);

	const isManager = user?.role === "manager";
	const isUser = user?.role === "user";

	const pageSize = 5;

	const [deleteTaskAssign, { isSuccess: isDeletingSuccess }] =
		useDeleteTaskAssignMutation();

	const navigate = useNavigate();

	useEffect(() => {
		if (isDeletingSuccess) {
			refetch();
		}
	}, [isDeletingSuccess, refetch]);

	const showModal = (id) => {
		setIsModalVisible(true);
		setTaskAssignId(id);
	};

	const handleView = (task) => {
		setSelectedTask(task);
		setViewModalVisible(true);
	};

	const handleViewModalClose = () => {
		setViewModalVisible(false); // Hide the modal
		setSelectedTask(null);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleEdit = (id) => {
		navigate(`/task/assigns/edit/${id}`);
	};

	const handleDeleteTaskAssign = async () => {
		try {
			if (taskAssignId) {
				await deleteTaskAssign(taskAssignId).unwrap();
				setIsModalVisible(false);
				message.success("TaskAssign deleted successfully.");
				setTaskAssignId(null);
			}
		} catch (err) {
			console.error("Error deleting:", err);
			message.error("TaskAssign is not deleted.");
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
		...(isUser
			? []
			: [
					{
						title: "User",
						dataIndex: "user",
						key: "user",
						render: (_, record) => {
							// Get the first character of the first name
							const initial = record?.user?.firstName.charAt(0).toUpperCase();

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
									<span>{`${record?.user?.firstName} ${
										record?.user?.lastName ? record?.user?.lastName : ""
									}`}</span>
								</div>
							);
						},
					},
			  ]),
		...(!isManager
			? [
					{
						title: "Manager",
						dataIndex: "manager",
						key: "manager",
						render: (_, record) => {
							// Get the first character of the first name
							const initial = record?.manager?.firstName
								.charAt(0)
								.toUpperCase();

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
									<span>{`${record?.manager?.firstName} ${
										record?.manager?.lastName ? record?.manager?.lastName : ""
									}`}</span>
								</div>
							);
						},
					},
			  ]
			: []),
		{
			title: "Task",
			dataIndex: "task",
			key: "task",
			render: (_, record) => `${record?.task?.title}`,
		},
		{
			title: "Due Date",
			dataIndex: "endDate",
			key: "endDate",
			align: "center",
			width: 200,
			render: (date) => moment(date).format("DD MMMM YYYY"),
			// Due Date Filter
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<RangePicker
						onChange={(dates) => {
							setSelectedKeys(dates ? [dates] : []);
						}}
						value={selectedKeys[0]}
						style={{ marginBottom: 8, display: "block" }}
					/>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Button
							type="primary"
							onClick={() => confirm()}
							icon={<FaSearchPlus />}
							size="small"
							style={{ width: 90 }}
						>
							Filter
						</Button>
						<Button
							onClick={() => clearFilters()}
							size="small"
							style={{ width: 90 }}
							className="border-none"
						>
							Reset
						</Button>
					</div>
				</div>
			),
			onFilter: (value, record) => {
				if (!value || value.length === 0) return true;
				const [start, end] = value;
				return moment(record.task.endDate).isBetween(start, end, "days", "[]");
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			align: "center",
			// Status Filter
			filters: [
				{ text: "Pending", value: "pending" },
				{ text: "In Progress", value: "in-progress" },
				{ text: "Completed", value: "completed" },
			],
			onFilter: (value, record) => record?.task?.status === value,
			render: (_, record) => {
				let status = record?.task?.status;

				let color, text;
				switch (status) {
					case "pending":
						color = "orange";
						text = "Pending";
						break;
					case "in-progress":
						color = "blue";
						text = "In Progress";
						break;
					case "completed":
						color = "green";
						text = "Completed";
						break;
					default:
						color = "default";
						text = "Unknown";
				}
				return (
					<Tag color={color} className="rounded-full font-bold capitalize">
						{text}
					</Tag>
				);
			},
			width: 120,
		},

		...(isUser
			? []
			: [
					{
						title: "Actions",
						key: "actions",
						render: (_, record) => (
							<div className="flex justify-center gap-2">
								<ActionMenu
									recordId={record._id}
									onEdit={() => handleEdit(record._id)}
									onView={() => handleView(record)}
									onDelete={() => showModal(record._id)}
								/>
							</div>
						),
						className: "text-center",
						width: 100,
						align: "center",
					},
			  ]),
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

			{/* Task View Modal */}
			<TaskAssignViewModal
				visible={viewModalVisible}
				onClose={handleViewModalClose}
				taskAssign={selectedTask}
			/>

			{/* Delete confirmation modal */}
			<DeleteConfirmModal
				isModalVisible={isModalVisible}
				handleCancel={handleCancel}
				handleOk={handleDeleteTaskAssign}
				task='task assign'
			/>
		</>
	);
};

TaskAssignDataTable.propTypes = {
	data: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	refetch: PropTypes.func.isRequired,
};

export default TaskAssignDataTable;
