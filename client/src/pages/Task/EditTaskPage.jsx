import { message } from "antd";
import TaskForm from "../../components/Task/TaskForm";
import { useNavigate, useParams } from "react-router-dom";
import {
	useGetTaskDetailsQuery,
	useUpdateTaskMutation,
} from "../../redux/slice/taskSlice";
import Loader from "../../components/shared/Loader";

const EditTaskPage = () => {
	const { id } = useParams();
	const {
		data: task,
		isLoading: taskLoading,
		refetch,
	} = useGetTaskDetailsQuery(id, {
		skip: !id,
	});

	const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation({});

	const navigate = useNavigate();

	const handleSubmit = async (values) => {
		try {
			await updateTask({ id, ...values }).unwrap();
			refetch();
			message.success("Task updated successfully");
			navigate("/tasks");
		} catch (error) {
			console.error("Failed to update task:", error);
			message.error(error?.data?.message);
		}
	};

	return taskLoading ? (
		<Loader />
	) : (
		<div className="max-w mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">Edit Task</h1>
			{task && task?.doc ? (
				<TaskForm
					mode="edit"
					onSubmit={handleSubmit}
					isLoading={isUpdating}
					initialValues={task?.doc}
				/>
			) : (
				<p>Task details not found!</p>
			)}
		</div>
	);
};

export default EditTaskPage;
