/* eslint-disable react/prop-types */
import { Form, Input } from "antd";

const Step2 = ({ form }) => {
	return (
		<Form form={form} name="step2" layout="vertical">
			<Form.Item
				name="address"
				label="Address"
				rules={[{ required: true, message: "Please input your address!" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="phone"
				label="Phone"
				rules={[
					{ required: true, message: "Please input your phone number!" },
					{
						pattern: /^(?:\+92|0)?3[0-9]{2}[0-9]{7}$/,
						message: "Please enter a valid phone number!",
					},
				]}
			>
				<Input />
			</Form.Item>
		</Form>
	);
};

export default Step2;
