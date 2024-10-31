import { Spin } from "antd";

const Loader = () => {
	return (
		<div className="p-8 w-full flex justify-center items-center">
			<Spin size="large" />
		</div>
	);
};

export default Loader;
