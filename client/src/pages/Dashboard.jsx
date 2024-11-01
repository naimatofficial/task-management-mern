import { Row, Col, Card, Statistic } from "antd";
import {
	FaTasks,
	FaHourglassHalf,
	FaSyncAlt,
	FaCheckCircle,
	FaUser,
	FaUsers,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useGetDashboardStatsQuery } from "../redux/slice/statsSlice";
import DateTime from "../components/shared/DateTime";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
	const user = useAuth();
	const [stats, setStats] = useState({
		totalTasks: 0,
		tasksByStatus: {
			pending: 0,
			inProgress: 0,
			completed: 0,
		},
		totalUsers: 0,
		totalManagers: 0,
	});

	const { data, isLoading, error } = useGetDashboardStatsQuery();

	useEffect(() => {
		if (data?.doc) {
			const statsData = {
				totalTasks: data.doc.totalTasks,
				tasksByStatus: {
					pending: data.doc.tasksByStatus.pending,
					inProgress: data.doc.tasksByStatus.inProgress,
					completed: data.doc.tasksByStatus.completed,
				},
				totalUsers: data.doc.totalUsers,
				totalManagers: data.doc.totalManagers,
			};
			setStats(statsData);
		}
	}, [data?.doc]);

	console.log(data?.doc);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error fetching stats!</div>;

	return (
		<div className="p-6 bg-gray-100 min-h-[80vh]">
			<DateTime />
			<Row gutter={[16, 16]}>
				{/* Total Tasks */}
				<Col xs={24} sm={12} md={8} lg={8}>
					<Card className="bg-blue-50 shadow-md rounded-lg">
						<Statistic
							title={<span className="font-semibold text-lg">Total Tasks</span>}
							value={stats.totalTasks}
							valueStyle={{ color: "#1890ff" }}
							prefix={<FaTasks className="text-blue-500" />}
						/>
					</Card>
				</Col>
				{/* Pending Tasks */}
				<Col xs={24} sm={12} md={8} lg={8}>
					<Card className="bg-orange-50 shadow-md rounded-lg">
						<Statistic
							title={
								<span className="font-semibold text-lg">Pending Tasks</span>
							}
							value={stats.tasksByStatus.pending}
							valueStyle={{ color: "orange" }}
							prefix={<FaHourglassHalf className="text-orange-500" />}
						/>
					</Card>
				</Col>
				{/* In Progress Tasks */}
				<Col xs={24} sm={12} md={8} lg={8}>
					<Card className="bg-yellow-50 shadow-md rounded-lg">
						<Statistic
							title={
								<span className="font-semibold text-lg">In Progress Tasks</span>
							}
							value={stats.tasksByStatus.inProgress}
							valueStyle={{ color: "#1890ff" }}
							prefix={<FaSyncAlt className="text-blue-500" />}
						/>
					</Card>
				</Col>
				{/* Completed Tasks */}
				<Col xs={24} sm={12} md={8} lg={8}>
					<Card className="bg-green-50 shadow-md rounded-lg">
						<Statistic
							title={
								<span className="font-semibold text-lg">Completed Tasks</span>
							}
							value={stats.tasksByStatus.completed}
							valueStyle={{ color: "green" }}
							prefix={<FaCheckCircle className="text-green-500" />}
						/>
					</Card>
				</Col>
				{/* Total Users - Admin Only */}
				{user.role === "admin" && (
					<Col xs={24} sm={12} md={8} lg={8}>
						<Card className="bg-green-100 shadow-md rounded-lg">
							<Statistic
								title={
									<span className="font-semibold text-lg">Total Users</span>
								}
								value={stats.totalUsers}
								valueStyle={{ color: "#3f8600" }}
								prefix={<FaUser className="text-green-500" />}
							/>
						</Card>
					</Col>
				)}
				{/* Total Managers - Admin Only */}
				{user.role === "admin" && (
					<Col xs={24} sm={12} md={8} lg={8}>
						<Card className="bg-purple-50 shadow-md rounded-lg">
							<Statistic
								title={
									<span className="font-semibold text-lg">Total Managers</span>
								}
								value={stats.totalManagers}
								valueStyle={{ color: "#722ed1" }}
								prefix={<FaUsers className="text-purple-500" />}
							/>
						</Card>
					</Col>
				)}
			</Row>
		</div>
	);
};

export default Dashboard;
