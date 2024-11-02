/* eslint-disable react/prop-types */
import { Modal, Space } from "antd";

const DeleteConfirmModal = ({
	isModalVisible,
	handleOk,
	handleCancel,
	task,
}) => {
	return (
		<Space>
			<Modal
				title="Delete Confirmation"
				open={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="Delete"
				cancelText="No"
			>
				<p>Are you sure you want to delete this {task}?</p>
			</Modal>
		</Space>
	);
};

export default DeleteConfirmModal;
