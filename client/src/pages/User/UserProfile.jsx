import {
	useGetUserDetailsQuery,
	useUpdateUserMutation,
} from "../../redux/slice/userSlice";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/shared/Loader";
import useAuth from "../../hooks/useAuth";

import { useState } from "react";
import {
	Badge,
	Avatar,
	Button,
	Input,
	message,
	Card,
	Descriptions,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { setCredentials } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";

const UserProfile = () => {
	const [searchParams] = useSearchParams();
	const userId = searchParams.get("userId");

	const user = useAuth();

	console.log(user);

	const [isEditing, setIsEditing] = useState(false);
	const [editableUser, setEditableUser] = useState({});
	const [userUpdate, { isLoading: isUpdating }] = useUpdateUserMutation();

	const { data, isLoading } = useGetUserDetailsQuery(userId || user?._id);

	const handleEditToggle = () => {
		setIsEditing((prev) => !prev);
		if (!isEditing) {
			setEditableUser({ ...data.doc }); // Load current user data into editableUser
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditableUser((prev) => ({ ...prev, [name]: value }));
	};

	const dispatch = useDispatch();

	const handleSaveChanges = async () => {
		try {
			const res = await userUpdate({
				id: data?.doc?._id,
				...editableUser,
			}).unwrap(); // Call the update mutation
			message.success("User updated");
			dispatch(setCredentials({ ...res }));

			setIsEditing(false); // Exit edit mode
		} catch (error) {
			console.error("Failed to update user: ", error);
		}
	};

	if (isLoading) return <Loader />;

	if (!data || !data.doc) return <p>User details not found!</p>;

	console.log(data);

	return (
		<Card
			style={{
				width: 400,
				margin: "auto",
				borderRadius: "8px",
				boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
			}}
		>
			<div style={{ textAlign: "center", marginBottom: "16px" }}>
				<Avatar size={80} icon={<UserOutlined />} style={{ marginBottom: 8 }} />
				<h2>{editableUser.firstName || data.doc.firstName}</h2>
				<Badge
					status={data.doc.active ? "success" : "default"}
					text={data.doc.active ? "Active" : "Inactive"}
				/>
			</div>

			{isEditing ? (
				<div>
					<Input
						name="firstName"
						placeholder="First Name"
						value={editableUser.firstName}
						onChange={handleInputChange}
						style={{ marginBottom: "8px" }}
					/>
					<Input
						name="email"
						placeholder="Email"
						value={editableUser.email}
						onChange={handleInputChange}
						style={{ marginBottom: "8px" }}
					/>
					<Button
						type="primary"
						onClick={handleSaveChanges}
						loading={isUpdating}
					>
						Save Changes
					</Button>
					<Button onClick={handleEditToggle} style={{ marginLeft: 8 }}>
						Cancel
					</Button>
				</div>
			) : (
				<Descriptions bordered column={1}>
					<Descriptions.Item label="Role">{data.doc.role}</Descriptions.Item>
					<Descriptions.Item label="Email">{data.doc.email}</Descriptions.Item>
					<Descriptions.Item label="Joined">
						{new Date(data.doc.createdAt).toLocaleDateString()}
					</Descriptions.Item>
					<Descriptions.Item>
						<Button type="primary" onClick={handleEditToggle}>
							Edit
						</Button>
					</Descriptions.Item>
				</Descriptions>
			)}
		</Card>
	);
};

export default UserProfile;
