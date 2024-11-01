import { message } from "antd";
import TaskAssignForm from "../../components/TaskAssign/TaskAssignForm";
import { useNavigate, useParams } from "react-router-dom";
import {
	useGetTaskAssignDetailsQuery,
	useUpdateTaskAssignMutation,
} from "../../redux/slice/taskAssignSlice";
import Loader from "../../components/shared/Loader";

const EditTaskAssignPage = () => {
	const { id } = useParams();
	const {
		data: taskAssign,
		isLoading: taskAssignLoading,
		refetch,
	} = useGetTaskAssignDetailsQuery(id, {
		skip: !id,
	});

	console.log(taskAssign);

	const [updateTaskAssign, { isLoading: isUpdating }] =
		useUpdateTaskAssignMutation({});

	const navigate = useNavigate();

	const handleSubmit = async (values) => {
		try {
			await updateTaskAssign({ id, ...values }).unwrap();
			refetch();
			message.success("Task Assign updated successfully");
			navigate("/task/assigns");
		} catch (error) {
			console.error("Failed to update Task Assign:", error);
			message.error(error?.data?.message);
		}
	};

	return taskAssignLoading ? (
		<Loader />
	) : (
		<div className="max-w mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">Edit Task Assign</h1>
			{taskAssign && taskAssign?.doc ? (
				<TaskAssignForm
					mode="edit"
					onSubmit={handleSubmit}
					isLoading={isUpdating}
					initialValues={taskAssign?.doc}
				/>
			) : (
				<p>Task Assign details not found!</p>
			)}
		</div>
	);
};

export default EditTaskAssignPage;
