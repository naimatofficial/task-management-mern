import { useEffect, useState } from "react";
import { useGetTaskAssignsQuery } from "../../redux/slice/taskAssignSlice";
import TaskAssignDataTable from "../../components/TaskAssign/TaskAssignDataTable";
import Loader from "../../components/shared/Loader";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "antd";

const TaskAssignPage = () => {
	const [managerId, setManagerId] = useState(null);
	const [userId, setUserId] = useState(null);

	const user = useAuth();

	const { data, isLoading, refetch } = useGetTaskAssignsQuery(
		managerId ? { manager: managerId } : userId ? { user: userId } : {},
		{ skip: !user }
	);

	useEffect(() => {
		if (user?.role === "manager") {
			setManagerId(user._id);
		} else if (user?.role === "user") {
			setUserId(user?._id);
		}

		refetch();
	}, [user, data, refetch]);

	return isLoading ? (
		<Loader />
	) : (
		<div className="p-4">
			<div className="flex justify-between items-center px-2 py-2 mb-2">
				<h2 className="font-bold text-2xl text-gray-900">All Assign Tasks</h2>
				<Link to="/task/assigns/add">
					<Button
						type="primary"
						htmlType="submit"
						style={{ padding: "20px 30px", fontSize: "16px" }}
					>
						Assign Task
					</Button>
				</Link>
			</div>

			{data?.doc && data?.results > 0 ? (
				<TaskAssignDataTable data={data?.doc} refetch={refetch} user={user} />
			) : (
				<div className="text-center text-gray-600 text-lg">
					<p> No tasks found!</p>
				</div>
			)}
		</div>
	);
};

export default TaskAssignPage;
