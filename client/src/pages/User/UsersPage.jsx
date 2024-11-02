import { useGetUsersQuery } from "../../redux/slice/userSlice";
import Loader from "../../components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import UserDataTable from "../../components/User/UserDataTable";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const UsersPage = () => {
	const [searchText, setSearchText] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	const user = useAuth();

	const navigate = useNavigate();

	const { data: users, isLoading, refetch } = useGetUsersQuery({});

	useEffect(() => {
		if (user?.role === "user") {
			navigate("/");
		}
	}, [navigate, user]);

	useEffect(() => {
		if (users?.doc) {
			setFilteredData(users?.doc);
		}
	}, [users?.doc]);

	const handleSearch = (e) => {
		const value = e.target.value;
		setSearchText(value);

		const filteredusers = users?.doc?.filter((user) => {
			const username = user.firstName + user.lastName;

			return username.toLowerCase().includes(value.toLowerCase());
		});

		setFilteredData(filteredusers);
	};

	return isLoading ? (
		<Loader />
	) : (
		<div className="p-4">
			<h2 className="font-bold text-2xl text-gray-900 mb-2">All Users</h2>
			<div className="flex justify-between items-center gap-4 px-2 py-2 mb-2">
				<div className="flex-grow">
					<Input
						placeholder="Search tasks here"
						value={searchText}
						onChange={handleSearch}
						className="py-2"
					/>
				</div>
				{user?.role === "admin" && (
					<Link to="/add-user">
						<Button
							type="primary"
							htmlType="submit"
							style={{ padding: "20px 30px", fontSize: "16px" }}
						>
							Add User
						</Button>
					</Link>
				)}
			</div>

			{users && users?.doc && users?.results > 0 && filteredData ? (
				<UserDataTable data={filteredData} refetch={refetch} user={user} />
			) : (
				<div className="text-center text-gray-600 text-lg">
					<p> No users found!</p>
				</div>
			)}
		</div>
	);
};

export default UsersPage;
