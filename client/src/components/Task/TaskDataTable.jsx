import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmModal from "./../shared/DeleteConfirmModal";
import ActionMenu from "./../shared/ActionMenu";
import DataTable from "../shared/DataTable";
import { useDeleteTaskMutation } from "../../redux/slice/taskSlice";
import moment from "moment";
import TaskViewModal from "./TaskViewModal";

import { Button, DatePicker, message, Tag } from "antd";
import { FaSearchPlus } from "react-icons/fa";
const { RangePicker } = DatePicker;

const TaskDataTable = ({ data, refetch }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [taskId, settaskId] = useState(null);
	const [current, setCurrent] = useState(1);

	const [viewModalVisible, setViewModalVisible] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);

	const pageSize = 5;

	const [deleteTask, { isSuccess: isDeletingSuccess }] =
		useDeleteTaskMutation();

	const navigate = useNavigate();

	useEffect(() => {
		if (isDeletingSuccess) {
			refetch();
		}
	}, [isDeletingSuccess, refetch]);

	const showModal = (id) => {
		setIsModalVisible(true);
		settaskId(id);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleView = (task) => {
		setSelectedTask(task);
		setViewModalVisible(true);
	};

	const handleViewModalClose = () => {
		setViewModalVisible(false); // Hide the modal
		setSelectedTask(null);
	};

	const handleEdit = (id) => {
		navigate(`/tasks/edit/${id}`);
	};

	const handleDeleteTask = async () => {
		try {
			if (taskId) {
				console.log(taskId);
				setIsModalVisible(false);
				await deleteTask(taskId).unwrap();
				message.success("Task deleted successfully.");
				settaskId(null);
			}
		} catch (err) {
			console.error("Error deleting:", err);
			message.error("Task is not deleted.");
		}
	};

	const columns = [
		{
			title: "S.No",
			dataIndex: "index",
			key: "index",
			render: (_, __, index) => index + 1 + (current - 1) * pageSize,
			align: "center",
			width: 80,
		},
		{
			title: "Task Name",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Start Date",
			dataIndex: "startDate",
			key: "startDate",
			render: (date) => moment(date).format("DD MMMM YYYY"),
			align: "center",
			width: 200,
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
						>
							Reset
						</Button>
					</div>
				</div>
			),
			onFilter: (value, record) => {
				if (!value || value.length === 0) return true;
				const [start, end] = value;
				return moment(record.endDate).isBetween(start, end, "days", "[]");
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
			onFilter: (value, record) => record.status === value,
			render: (status) => {
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
			align: "center",
			width: 100,
		},
	];

	// const columns = [
	// 	{
	// 		title: "S.No",
	// 		dataIndex: "index",
	// 		key: "index",
	// 		render: (_, __, index) => index + 1 + (current - 1) * pageSize,
	// 		className: "text-center",
	// 		width: 80,
	// 	},
	// 	{
	// 		title: "Task Name",
	// 		dataIndex: "title",
	// 		key: "title",
	// 	},

	// 	{
	// 		title: "Start Date",
	// 		dataIndex: "startDate",
	// 		key: "startDate",
	// 		render: (date) => moment(date).format("DD MMMM YYYY"),
	// 		className: "text-center",
	// 		width: 200,
	// 		align: "center",
	// 	},
	// 	{
	// 		title: "Due Date",
	// 		dataIndex: "endDate",
	// 		key: "endDate",
	// 		render: (date) => moment(date).format("DD MMMM YYYY"),
	// 		className: "text-center",
	// 		width: 200,
	// 		align: "center",
	// 	},
	// 	{
	// 		title: "Status",
	// 		dataIndex: "status",
	// 		key: "status",
	// 		align: "center",

	// 		render: (status) => {
	// 			let color;
	// 			let text;

	// 			switch (status) {
	// 				case "pending":
	// 					color = "orange"; // Updated color for pending
	// 					text = "Pending";
	// 					break;
	// 				case "in-progress":
	// 					color = "blue";
	// 					text = "In Progress";
	// 					break;
	// 				case "completed":
	// 					color = "green";
	// 					text = "Completed";
	// 					break;
	// 				default:
	// 					color = "default";
	// 					text = "Unknown";
	// 			}

	// 			return (
	// 				<Tag color={color} className={`rounded-full font-bold capitalize`}>
	// 					{text}
	// 				</Tag>
	// 			);
	// 		},
	// 		width: 120,
	// 	},
	// 	{
	// 		title: "Actions",
	// 		key: "actions",
	// 		render: (_, record) => (
	// 			<div className="flex justify-center gap-2">
	// 				<ActionMenu
	// 					recordId={record._id}
	// 					onEdit={() => handleEdit(record._id)}
	// 					onView={() => handleView(record)}
	// 					onDelete={() => showModal(record._id)}
	// 				/>
	// 			</div>
	// 		),
	// 		className: "text-center",
	// 		width: 100,
	// 		align: "center",
	// 	},
	// ];

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
			<TaskViewModal
				visible={viewModalVisible}
				onClose={handleViewModalClose}
				task={selectedTask}
			/>

			{/* Delete confirmation modal */}
			<DeleteConfirmModal
				isModalVisible={isModalVisible}
				handleCancel={handleCancel}
				handleOk={handleDeleteTask}
			/>
		</>
	);
};

TaskDataTable.propTypes = {
	data: PropTypes.array.isRequired,
	refetch: PropTypes.func.isRequired,
};

export default TaskDataTable;
