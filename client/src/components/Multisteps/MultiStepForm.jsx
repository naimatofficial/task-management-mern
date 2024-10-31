import { useState } from "react";
import { Form, Button, Steps, message } from "antd";
import { useNavigate } from "react-router-dom";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import "antd/dist/reset.css";
import { useCreateUserMutation } from "../../redux/userSlice";

const { Step } = Steps;

const MultiStepForm = () => {
	const [current, setCurrent] = useState(0);
	const navigate = useNavigate();

	const [createUser, { isLoading: isCreatingUser }] = useCreateUserMutation();

	const [formValues, setFormValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		address: "",
		phone: "",
		password: "",
	});
	const [form] = Form.useForm();

	const steps = [
		{
			title: "User Information",
			content: <Step1 form={form} />,
		},
		{
			title: "Address Details",
			content: <Step2 form={form} />,
		},
		{
			title: "Review & Submit",
			content: <Step3 formValues={formValues} />,
		},
	];

	const next = () => {
		form
			.validateFields()
			.then((values) => {
				setFormValues((prev) => ({
					...prev,
					...values,
				}));
				setCurrent(current + 1);
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const handleSubmit = () => {
		form
			.validateFields()
			.then(async (values) => {
				// Combine the form values
				const userData = {
					...formValues,
					...form.getFieldsValue(),
				};

				console.log(userData);

				// `unwrap` will return a fulfilled or rejected response
				await createUser(userData).unwrap();
				message.success("User added successfully");
				// Reset the form on successful submission
				form.resetFields();
				navigate("/");
			})
			.catch((error) => {
				console.error("Failed to create user:", error);
				message.error(error?.data?.message);
			});
	};

	return (
		<div className="container p-8 w-2/3 mx-auto bg-gray-50 shadow-sm rounded-lg">
			<Steps current={current} style={{ marginBottom: 20 }}>
				{steps.map((item) => (
					<Step key={item.title} title={item.title} />
				))}
			</Steps>
			<div className="steps-content">{steps[current].content}</div>
			<div className="steps-action float-end">
				{current > 0 && (
					<Button style={{ margin: "0 8px" }} onClick={() => prev()}>
						Previous
					</Button>
				)}
				{current < steps.length - 1 && (
					<Button type="primary" onClick={() => next()}>
						Next
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button type="primary" onClick={() => handleSubmit()}>
						{isCreatingUser ? "loading..." : "Submit"}
					</Button>
				)}
			</div>
		</div>
	);
};

export default MultiStepForm;
