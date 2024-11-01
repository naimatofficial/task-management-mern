/* eslint-disable react/prop-types */
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Select, Button } from "antd";
import { useForm } from "antd/es/form/Form";

import { useGetUsersQuery } from "./../../redux/slice/userSlice";
import { useGetTasksQuery } from "./../../redux/slice/taskSlice";
import Loader from "../shared/Loader";

const TaskAssignForm = ({ mode, onSubmit, initialValues }) => {
	const [form] = useForm();

	const { data: users, isLoading: usersLoading } = useGetUsersQuery({});
	const { data: tasks, isLoading: tasksLoading } = useGetTasksQuery({});

	useEffect(() => {
		if (initialValues) {
			form.setFieldsValue({
				...initialValues,
				user: initialValues.user._id || null,
				task: initialValues.task._id || null,
			});
		}
	}, [initialValues, form]);

	const onFinish = (values) => {
		onSubmit(values);
		form.reset();
	};

	return usersLoading || tasksLoading ? (
		<Loader />
	) : users?.doc && tasks?.doc ? (
		<Form form={form} layout="vertical" onFinish={onFinish} className="p-8">
			<Row gutter={16}>
				<Col xs={24} lg={12}>
					<Form.Item
						name="task"
						label="Task"
						rules={[
							{
								required: true,
								message: "Please select the user status.",
							},
						]}
					>
						<Select size="large" placeholder="Select task">
							{tasks?.doc?.map((task) => (
								<Select.Option key={task._id} value={task._id}>
									{task.title}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Col>

				<Col xs={24} lg={12}>
					<Form.Item
						name="user"
						label="User"
						rules={[
							{
								required: true,
								message: "Please select the user.",
							},
						]}
					>
						<Select size="large" placeholder="Select user">
							{users?.doc?.map((user) => (
								<Select.Option key={user._id} value={user._id}>
									{user.firstName}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Col>
			</Row>

			<Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button
					type="primary"
					htmlType="submit"
					style={{ padding: "20px 30px", fontSize: "16px" }}
				>
					{mode === "edit" ? "Update Assign Task" : "Assign Task"}
				</Button>
			</Form.Item>
		</Form>
	) : (
		<p>Users & Tasks not found!</p>
	);
};

TaskAssignForm.propTypes = {
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
TaskAssignForm.defaultProps = {
	initialValues: null,
};

export default TaskAssignForm;
