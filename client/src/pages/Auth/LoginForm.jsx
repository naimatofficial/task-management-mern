import { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useLoginUserMutation } from "../../redux/slice/userSlice"; // import the login action
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slice/authSlice";
import useAuth from "./../../hooks/useAuth";
import { getRandomColor } from "../../utils/helpers";

const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [loginUser, { isLoading }] = useLoginUserMutation();

	const user = useAuth();

	useEffect(() => {
		if (user && user?.doc) {
			navigate("/");
		}
	}, [navigate, user]);

	const handleLogin = async (values) => {
		try {
			setLoading(true);
			const res = await loginUser(values).unwrap();

			const avatarBg = getRandomColor();

			dispatch(setCredentials({ ...res, avatarBg }));
			navigate("/");
			message.success(`Welcome ${res?.user?.firstName || "back"}!`);
		} catch (error) {
			message.error(error?.data?.message || "Login failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900">Login</h1>
				<h1 className="text-base text-gray-700">
					Welcome back to Task Management
				</h1>
			</div>
			<Form
				name="loginForm"
				layout="vertical"
				onFinish={handleLogin}
				initialValues={{ email: "", password: "" }}
				className="w-full"
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[{ required: true, message: "Please enter your email" }]}
				>
					<Input placeholder="Email" className="py-2" />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: "Please enter your password" }]}
				>
					<Input.Password placeholder="Password" className="py-2" />
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						block
						className="py-6 px-12 text-lg"
					>
						{isLoading ? "is loging..." : "Continue"}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LoginForm;
