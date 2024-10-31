import { useEffect, useState } from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useGetTaskAssignsQuery } from "../../redux/slice/taskAssignSlice";
import TaskAssignDataTable from "../../components/TaskAssign/TaskAssignDataTable";
import Loader from "../../components/shared/Loader";
import useAuth from "../../hooks/useAuth";

const TaskAssignPage = () => {
	const [managerId, setManagerId] = useState(null);

	const user = useAuth();

	// Set the managerId if the user's role is "manager"
	useEffect(() => {
		if (user?.role === "manager") {
			setManagerId(user._id); // assuming user._id is the ID for the manager
		}
	}, [user]);

	const { data, isLoading, refetch } = useGetTaskAssignsQuery(
		managerId ? { manager: managerId } : {}, // Pass managerId in the query
		{ skip: !user } // Skip the query if managerId is not set
	);

	return isLoading ? (
		<Loader />
	) : (
		<div className="p-4">
			<div className="flex justify-between items-center px-2 py-2 mb-2">
				<h2 className="font-bold text-2xl text-gray-900">All Assign Tasks</h2>
				{/* <Link to="/add-task" className="btn primary-btn">
					Assign Task
				</Link> */}
			</div>

			{data?.doc && data?.results > 0 ? (
				<TaskAssignDataTable data={data?.doc} refetch={refetch} />
			) : (
				<div className="text-center text-gray-600 text-lg">
					<p> No tasks found!</p>
				</div>
			)}
		</div>
	);
};

export default TaskAssignPage;
