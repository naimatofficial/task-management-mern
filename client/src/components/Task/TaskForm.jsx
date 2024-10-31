import { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, DatePicker, Row, Col, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import moment from "moment";

const TaskForm = ({ mode, onSubmit, initialValues, isLoading }) => {
	const [form] = useForm();

	// Set initial values when the component mounts or when mode changes
	useEffect(() => {
		if (initialValues) {
			form.setFieldsValue({
				...initialValues,
				startDate: initialValues.startDate
					? moment(initialValues.startDate)
					: null,
				endDate: initialValues.endDate ? moment(initialValues.endDate) : null,
			});
		}
	}, [initialValues, form]);

	const onFinish = (values) => {
		onSubmit(values);
		form.reset();
	};

	return (
		<Form form={form} layout="vertical" onFinish={onFinish}>
			{/* Title Field */}
			<Form.Item
				name="title"
				label="Task Title"
				rules={[
					{
						required: true,
						message: "Please provide the task title.",
					},
					{
						max: 512,
						message: "Title cannot exceed 512 characters.",
					},
				]}
			>
				<Input placeholder="Enter task title" />
			</Form.Item>

			<Row gutter={16}>
				{/* Start Date Field */}
				<Col xs={24} lg={12}>
					<Form.Item
						name="startDate"
						label="Start Date"
						rules={[
							{
								type: "object",
								required: true,
								message: "Please select start date!",
							},
						]}
					>
						<DatePicker
							style={{ width: "100%" }}
							disabledDate={(current) =>
								current && current < moment().startOf("day")
							}
						/>
					</Form.Item>
				</Col>

				{/* End Date Field */}
				<Col xs={24} lg={12}>
					<Form.Item
						name="endDate"
						label="End Date"
						rules={[
							{
								type: "object",
								required: true,
								message: "Please select end date!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (
										!value ||
										!getFieldValue("startDate") ||
										value.isAfter(getFieldValue("startDate"))
									) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error("End date must be after start date!")
									);
								},
							}),
						]}
					>
						<DatePicker
							style={{ width: "100%" }}
							disabledDate={(current) =>
								current && current < moment().startOf("day")
							}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item
				name="description"
				label="Description"
				rules={[
					{
						max: 2048,
						message: "Description cannot exceed 2048 characters.",
					},
				]}
			>
				<Input.TextArea rows={4} placeholder="Enter task description" />
			</Form.Item>

			<Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button
					type="primary"
					htmlType="submit"
					style={{ padding: "20px 30px", fontSize: "16px" }}
				>
					{mode === "edit" ? "Update Task" : "Add Task"}
				</Button>
			</Form.Item>
		</Form>
	);
};

// Define PropTypes for the component
TaskForm.propTypes = {
	mode: PropTypes.oneOf(["add", "edit"]).isRequired,
	onSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		startDate: PropTypes.instanceOf(Date),
		endDate: PropTypes.instanceOf(Date),
	}),
};

// Set default values for optional props
TaskForm.defaultProps = {
	initialValues: null,
};

export default TaskForm;
