import { message } from "antd";
import TaskForm from "../../components/Task/TaskForm";
import { useNavigate } from "react-router-dom";
import { useCreateTaskMutation } from "../../redux/slice/taskSlice";

const AddTaskPage = () => {
	const [createTask, { isLoading }] = useCreateTaskMutation({});

	const navigate = useNavigate();

	const handleSubmit = async (values) => {
		try {
			await createTask(values).unwrap();
			message.success("Task added successfully");
			navigate("/tasks");
		} catch (error) {
			console.error("Failed to create task:", error);
			message.error(error?.data?.message);
		}
	};

	return (
		<div className="max-w mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">Create New Task</h1>
			<TaskForm mode="add" onSubmit={handleSubmit} isLoading={isLoading} />
		</div>
	);
};

export default AddTaskPage;
