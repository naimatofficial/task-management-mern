import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Row, Col } from "antd";
import { useForm } from "antd/es/form/Form";

const UserForm = ({ mode, onSubmit, initialValues }) => {
	const [form] = useForm();

	// Set initial values when the component mounts or when mode changes
	React.useEffect(() => {
		if (initialValues) {
			form.setFieldsValue(initialValues);
		}
	}, [initialValues, form]);

	const onFinish = (values) => {
		console.log("Form values:", values);
		// Call the onSubmit prop to handle form submission
		onSubmit(values);
	};

	return (
		<Form form={form} layout="vertical" onFinish={onFinish}>
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
						<Input placeholder="Enter first name" />
					</Form.Item>
				</Col>

				{/* Last Name Field */}
				<Col xs={24} lg={12}>
					<Form.Item name="lastName" label="Last Name">
						<Input placeholder="Enter last name" />
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
						<Input placeholder="Enter email address" />
					</Form.Item>
				</Col>

				{/* Password Field */}
				<Col xs={24} lg={12}>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "Please provide a password.",
							},
							{
								min: 6,
								message: "Password must be at least 6 characters.",
							},
						]}
					>
						<Input.Password placeholder="Enter password" />
					</Form.Item>
				</Col>
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
