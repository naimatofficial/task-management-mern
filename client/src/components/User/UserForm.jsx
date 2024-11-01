import { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Row, Col, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import useAuth from "../../hooks/useAuth";

const UserForm = ({ mode, onSubmit, initialValues }) => {
	const [form] = useForm();

	const user = useAuth();

	const isAdmin = user.role === "admin";
	const isManager = user.role === "manager";

	// Set initial values when the component mounts or when mode changes
	useEffect(() => {
		if (initialValues) {
			form.setFieldsValue(initialValues);
		}
	}, [initialValues, form]);

	const onFinish = (values) => {
		console.log("Form values:", values);
		onSubmit(values);
	};

	return (
		<Form form={form} layout="vertical" onFinish={onFinish} className="p-8">
			<Row gutter={16}>
				{/* First Name Field */}
				<Col xs={24} lg={12}>
					<Form.Item
						name="firstName"
						label="First Name"
						rules={[
							{
								required: true,
								message: "Please tell us your name.",
							},
						]}
					>
						<Input placeholder="Enter first name" className="py-2" />
					</Form.Item>
				</Col>

				{/* Last Name Field */}
				<Col xs={24} lg={12}>
					<Form.Item name="lastName" label="Last Name">
						<Input placeholder="Enter last name" className="py-2" />
					</Form.Item>
				</Col>

				{/* Email Field */}
				<Col xs={24} lg={12}>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								message: "Please provide your email address.",
							},
							{
								type: "email",
								message: "Please provide a valid email address.",
							},
						]}
					>
						<Input placeholder="Enter email address" className="py-2" />
					</Form.Item>
				</Col>

				{/* Password Field */}
				<Col xs={24} lg={12}>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: mode !== "edit",
								message: "Please provide a password.",
							},
							{
								min: 6,
								message: "Password must be at least 6 characters.",
							},
						]}
					>
						<Input.Password className="py-2" />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				{isAdmin && mode === "edit" && (
					<Col xs={24} lg={12}>
						<Form.Item
							name="role"
							label="Role"
							rules={[
								{
									required: true,
									message: "Please select the user role.",
								},
							]}
						>
							<Select size="large" placeholder="Select user role">
								<Select.Option value="user">User</Select.Option>
								<Select.Option value="manager">Manager</Select.Option>
								<Select.Option value="admin">Admin</Select.Option>
							</Select>
						</Form.Item>
					</Col>
				)}

				{!isManager && (
					<Col xs={24} lg={12}>
						<Form.Item
							name="active"
							label="Active"
							rules={[
								{
									required: true,
									message: "Please select the user status.",
								},
							]}
						>
							<Select size="large" placeholder="Select user status">
								<Select.Option value={true}>Active</Select.Option>
								<Select.Option value={false}>In Active</Select.Option>
							</Select>
						</Form.Item>
					</Col>
				)}
			</Row>

			<Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button
					type="primary"
					htmlType="submit"
					style={{ padding: "20px 30px", fontSize: "16px" }}
				>
					{mode === "edit" ? "Update User" : "Add User"}
				</Button>
			</Form.Item>
		</Form>
	);
};

// Define PropTypes for the component
UserForm.propTypes = {
	mode: PropTypes.oneOf(["add", "edit"]).isRequired,
	onSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.shape({
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		email: PropTypes.string,
		password: PropTypes.string,
	}),
};

// Set default values for optional props
UserForm.defaultProps = {
	initialValues: null,
};

export default UserForm;
