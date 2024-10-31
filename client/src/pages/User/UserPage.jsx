import { useGetUsersQuery } from "./../../redux/slice/userSlice";
import Loader from "./../../components/shared/Loader";
import { Link } from "react-router-dom";
import UserDataTable from "../../components/User/UserDataTable";
import { Button } from "antd";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const UsersPage = () => {
	const [searchText, setSearchText] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	const user = useAuth();
	const [userId, setUserId] = useState(null);

	const { data: users, isLoading, refetch } = useGetUsersQuery({});

	useEffect(() => {
		if (user?.role === "manager" || user?.role === "user") {
			setUserId(user?._id);
		}
	}, [user]);

	useEffect(() => {
		if (users?.doc) {
			setFilteredData(users?.doc);
		}
	}, [users?.doc]);

	console.log({ filteredData });

	// Handle search functionality
	const handleSearch = (e) => {
		const value = e.target.value;
		setSearchText(value);

		// Filter data based on search input
		const filteredusers = users?.doc?.filter((user) =>
			user.title.toLowerCase().includes(value.toLowerCase())
		);
		setFilteredData(filteredusers);
	};

	return isLoading ? (
		<Loader />
	) : (
		<div className="p-4">
			<div className="flex justify-between items-center px-2 py-2 mb-2">
				<h2 className="font-bold text-2xl text-gray-900">All Users</h2>
				<Link to="/add-user">
					<Button
						type="primary"
						htmlType="submit"
						style={{ padding: "20px 30px", fontSize: "16px" }}
					>
						Add User
					</Button>
				</Link>
			</div>

			{users && users?.doc && users?.results > 0 ? (
				<UserDataTable data={users?.doc} refetch={refetch} />
			) : (
				<div className="text-center text-gray-600 text-lg">
					<p> No users found!</p>
				</div>
			)}
		</div>
	);
};

export default UsersPage;
