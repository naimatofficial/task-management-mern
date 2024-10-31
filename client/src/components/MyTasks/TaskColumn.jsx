import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { Card } from "antd";

const TaskColumn = ({ title, statusId, tasks }) => (
	<Card title={title} bordered={false} style={{ minHeight: "500px" }}>
		<Droppable droppableId={statusId}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					style={{ minHeight: "100px" }}
				>
					{tasks.map((task, index) => (
						<TaskCard key={task._id} task={task} index={index} />
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	</Card>
);

export default TaskColumn;
