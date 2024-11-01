import { useGetUserDetailsQuery } from "../../redux/slice/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/shared/Loader";
import useAuth from "../../hooks/useAuth";

import { Avatar, Button, Card, Descriptions, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserProfile = () => {
	const [searchParams] = useSearchParams();
	const userId = searchParams.get("userId");

	const user = useAuth();

	const navigate = useNavigate();

	const { data, isLoading } = useGetUserDetailsQuery(userId || user?._id);

	if (!data || !data.doc) return <p>User details not found!</p>;

	const userData = data?.doc;

	const statusColor = userData?.active ? "green" : "red";
	const statusText = userData?.active ? "Active" : "Inactive";

	return isLoading ? (
		<Loader />
	) : data && data?.doc && user ? (
		<Card
			style={{
				width: 800,
				margin: "auto",
				borderRadius: "8px",
				boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
			}}
		>
			<div className="flex justify-between items-center">
				<div style={{ textAlign: "center", marginBottom: "16px" }}>
					<Avatar
						size={80}
						style={{
							backgroundColor: "#gray",
							marginBottom: 8,
							fontSize: "28px",
						}}
					>
						{userData.firstName ? (
							userData.firstName.charAt(0).toUpperCase()
						) : (
							<UserOutlined />
						)}
					</Avatar>
					<h2>
						{userData.firstName} {userData.lastName}
					</h2>
					<Tag
						color={statusColor}
						className="rounded-full font-bold capitalize"
					>
						{statusText}
					</Tag>
				</div>
				<Button
					type="primary"
					onClick={() => navigate(`/users/edit/${userData._id}`)}
					className="py-4 px-8 text-lg"
				>
					Edit
				</Button>
			</div>

			<Descriptions bordered column={1}>
				<Descriptions.Item label="Role">{userData.role}</Descriptions.Item>
				<Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
				<Descriptions.Item label="Joined">
					{new Date(userData.createdAt).toLocaleDateString()}
				</Descriptions.Item>
			</Descriptions>
		</Card>
	) : (
		<p>User details not found!</p>
	);
};

export default UserProfile;
