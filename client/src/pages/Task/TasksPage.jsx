import { useGetTasksQuery } from "./../../redux/slice/taskSlice";
import Loader from "./../../components/shared/Loader";
import { Link } from "react-router-dom";
import TaskDataTable from "../../components/Task/TaskDataTable";
import { useEffect, useState } from "react";
import { Button, Input } from "antd";

const TasksPage = () => {
	const [searchText, setSearchText] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	const { data: tasks, isLoading, refetch } = useGetTasksQuery({});

	useEffect(() => {
		if (tasks?.doc) {
			setFilteredData(tasks?.doc);
		}
	}, [tasks?.doc]);

	// Handle search functionality
	const handleSearch = (e) => {
		const value = e.target.value;
		setSearchText(value);

		// Filter data based on search input
		const filteredTasks = tasks?.doc?.filter((task) =>
			task.title.toLowerCase().includes(value.toLowerCase())
		);
		setFilteredData(filteredTasks);
	};

	return isLoading ? (
		<Loader />
	) : (
		<div className="p-4">
			<h2 className="font-bold text-2xl text-gray-900">All Tasks</h2>
			<div className="flex justify-between items-center gap-4 px-2 py-2 mb-2">
				<div className="flex-grow">
					<Input
						placeholder="Search tasks here"
						value={searchText}
						onChange={handleSearch}
						className="py-2"
					/>
				</div>
				<Link to="/add-task">
					<Button
						type="primary"
						htmlType="submit"
						style={{ padding: "20px 30px", fontSize: "16px" }}
					>
						Add Task
					</Button>
				</Link>
			</div>

			{tasks?.doc && tasks?.results > 0 && filteredData ? (
				<TaskDataTable data={filteredData} refetch={refetch} />
			) : (
				<div className="text-center text-gray-600 text-lg">
					<p> No tasks found!</p>
				</div>
			)}
		</div>
	);
};

export default TasksPage;
