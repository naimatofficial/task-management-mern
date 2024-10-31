import { Modal, Space } from "antd";

const DeleteConfirmModal = ({ isModalVisible, handleOk, handleCancel }) => {
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
				<p>Are you sure you want to delete this user?</p>
			</Modal>
		</Space>
	);
};

export default DeleteConfirmModal;
