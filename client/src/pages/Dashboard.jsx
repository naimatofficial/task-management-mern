import { Row, Col, Card, Statistic } from "antd";
import {
	UserOutlined,
	TeamOutlined,
	CheckCircleOutlined,
	HourglassOutlined,
	SyncOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";

// Mock Data (Replace with your actual data fetching)
const mockData = {
	totalTasks: 100,
	tasksByStatus: {
		pending: 25,
		inProgress: 50,
		completed: 25,
	},
	totalUsers: 150,
	totalManagers: 10,
};

const Dashboard = () => {
	const [stats, setStats] = useState(mockData);

	// Use actual API call to fetch stats data
	useEffect(() => {
		// Fetch data and update state
		setStats(mockData);
	}, []);

	return (
		<div style={{ padding: "24px" }}>
			<h2 className="font-bold text-2xl mb-4">Dashboard Overview</h2>

			<Row gutter={[16, 16]}>
				{/* Total Tasks */}
				<Col xs={24} sm={12} md={8} lg={6}>
					<Card>
						<Statistic
							title="Total Tasks"
							value={stats.totalTasks}
							valueStyle={{ color: "#1890ff" }}
							prefix={<CheckCircleOutlined />}
						/>
					</Card>
				</Col>

				{/* Pending Tasks */}
				<Col xs={24} sm={12} md={8} lg={6}>
					<Card>
						<Statistic
							title="Pending Tasks"
							value={stats.tasksByStatus.pending}
							valueStyle={{ color: "orange" }}
							prefix={<HourglassOutlined />}
						/>
					</Card>
				</Col>

				{/* In Progress Tasks */}
				<Col xs={24} sm={12} md={8} lg={6}>
					<Card>
						<Statistic
							title="In Progress Tasks"
							value={stats.tasksByStatus.inProgress}
							valueStyle={{ color: "#1890ff" }}
							prefix={<SyncOutlined />}
						/>
					</Card>
				</Col>

				{/* Completed Tasks */}
				<Col xs={24} sm={12} md={8} lg={6}>
					<Card>
						<Statistic
							title="Completed Tasks"
							value={stats.tasksByStatus.completed}
							valueStyle={{ color: "green" }}
							prefix={<CheckCircleOutlined />}
						/>
					</Card>
				</Col>

				{/* Total Users */}
				<Col xs={24} sm={12} md={8} lg={6}>
					<Card>
						<Statistic
							title="Total Users"
							value={stats.totalUsers}
							valueStyle={{ color: "#3f8600" }}
							prefix={<UserOutlined />}
						/>
					</Card>
				</Col>

				{/* Total Managers */}
				<Col xs={24} sm={12} md={8} lg={6}>
					<Card>
						<Statistic
							title="Total Managers"
							value={stats.totalManagers}
							valueStyle={{ color: "#722ed1" }}
							prefix={<TeamOutlined />}
						/>
					</Card>
				</Col>

				{/* Additional Stats */}
				<Col xs={24} sm={12} md={8} lg={6}>
					<Card>
						<Statistic
							title="Other Metrics"
							value={45}
							valueStyle={{ color: "#faad14" }}
							prefix={<TeamOutlined />}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
