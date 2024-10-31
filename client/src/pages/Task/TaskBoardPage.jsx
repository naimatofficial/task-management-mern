import { DragDropContext } from "react-beautiful-dnd";
import {
	useGetTasksQuery,
	useUpdateTaskStatusMutation,
} from "../../redux/slice/taskSlice";

import { Row, Col } from "antd";
import TaskColumn from "./../../components/MyTasks/TaskColumn";
import Loader from "../../components/shared/Loader";

const statuses = [
	{ id: "pending", title: "To Do" },
	{ id: "in-progress", title: "In Progress" },
	{ id: "completed", title: "Done" },
];

const TaskBoardPage = () => {
	// const user = useAuth();

	const { data: tasks, isLoading, refetch } = useGetTasksQuery();

	console.log(tasks);

	const [updateTaskStatus] = useUpdateTaskStatusMutation();

	const onDragEnd = async (result) => {
		const { source, destination, draggableId } = result;

		if (!destination || source.droppableId === destination.droppableId) return;

		try {
			await updateTaskStatus({
				taskId: draggableId,
				status: destination.droppableId,
			});
			refetch(); // Refetch tasks after updating status
		} catch (error) {
			console.error("Failed to update task status", error);
		}
	};

	return isLoading ? (
		<Loader />
	) : tasks && tasks?.doc ? (
		<DragDropContext onDragEnd={onDragEnd}>
			<Row gutter={16} style={{ padding: "1rem" }}>
				{statuses?.map((status) => (
					<Col key={status.id} span={8}>
						<TaskColumn
							title={status.title}
							statusId={status.id}
							tasks={tasks?.doc?.filter((task) => task.status === status.id)}
						/>
					</Col>
				))}
			</Row>
		</DragDropContext>
	) : (
		<p>No Task found!</p>
	);
};

export default TaskBoardPage;
