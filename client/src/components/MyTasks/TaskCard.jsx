import { Card, Tag, Typography } from "antd";
import { Draggable } from "react-beautiful-dnd";

const { Title } = Typography;

const TaskCard = ({ task, index }) => (
	<Draggable draggableId={task._id} index={index}>
		{(provided) => (
			<Card
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				style={{ marginBottom: "8px", ...provided.draggableProps.style }}
			>
				<Title level={5}>{task.title}</Title>
				<Tag color={getStatusColor(task.status)}>{task.status}</Tag>
				<p>{task.description}</p>
			</Card>
		)}
	</Draggable>
);

const getStatusColor = (status) => {
	switch (status) {
		case "pending":
			return "red";
		case "in-progress":
			return "blue";
		case "completed":
			return "green";
		default:
			return "gray";
	}
};

export default TaskCard;
