/* eslint-disable react/prop-types */
import { Form, Input } from "antd";

const Step1 = ({ form }) => {
	return (
		<Form form={form} name="step1" layout="vertical">
			<Form.Item
				name="firstName"
				label="First Name"
				rules={[{ required: true, message: "Please input your first name!" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="lastName"
				label="Last Name"
				rules={[{ required: true, message: "Please input your last name!" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="email"
				label="Email"
				rules={[
					{ required: true, message: "Please input your email!" },
					{ type: "email", message: "The input is not valid E-mail!" },
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="password"
				label="Password"
				rules={[
					{ required: true, message: "Please input your password." },
					{ min: 8, message: "Password must be at least 8 characters long." },
				]}
			>
				<Input.Password />
			</Form.Item>
		</Form>
	);
};

export default Step1;
