import { message } from "antd";
import TaskAssignForm from "../../components/TaskAssign/TaskAssignForm";
import { useNavigate } from "react-router-dom";
import { useCreateTaskAssignMutation } from "../../redux/slice/taskAssignSlice";

const AddTaskAssignPage = () => {
	const [createTaskAssign, { isLoading }] = useCreateTaskAssignMutation({});

	const navigate = useNavigate();

	const handleSubmit = async (values) => {
		try {
			await createTaskAssign(values).unwrap();
			message.success("Task Assign successfully");
			navigate("/task/assigns");
		} catch (error) {
			console.error("Failed to create Task Assign:", error);
			message.error(error?.data?.message);
		}
	};

	return (
		<div className="max-w mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">New Task Assign</h1>
			<TaskAssignForm
				mode="add"
				onSubmit={handleSubmit}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default AddTaskAssignPage;
