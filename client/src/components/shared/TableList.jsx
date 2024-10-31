import PropTypes from "prop-types";
import { Table, Typography } from "antd";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useDeleteUserMutation } from "../../redux/slice/userSlice";
import { useEffect, useState } from "react";

const TableList = ({ title, data, columns, handleEdit, handleDelete }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [userId, setUserId] = useState(null);

	const [deleteUser, { isSuccess: isDeletingSuccess }] =
		useDeleteUserMutation();

	useEffect(() => {
		if (isDeletingSuccess) {
			refetch();
		}
	}, [isDeletingSuccess, refetch]);

	const showModal = (id) => {
		setIsModalVisible(true);
		setUserId(id);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	// Pagination configuration for Ant Design Table
	const paginationConfig = {
		pageSize: 10,
		showSizeChanger: false,
		hideOnSinglePage: true,
		className: "custom-pagination",
	};

	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden">
			<Typography.Title level={3} className="p-4 border-b text-gray-700">
				{title} List
			</Typography.Title>
			<Table
				columns={columns(handleEdit, handleDelete)}
				dataSource={data.map((item, index) => ({
					...item,
					key: index, // Key is required by Ant Design
				}))}
				pagination={paginationConfig}
				className="ant-table-custom p-4"
				bordered
				rowClassName="hover:bg-gray-50"
			/>

			<DeleteConfirmModal
				isModalVisible={isModalVisible}
				handleOk={handleOk}
				handleCancel={handleCancel}
			/>
		</div>
	);
};

TableList.propTypes = {
	title: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	handleShowModal: PropTypes.func.isRequired,
};

export default TableList;
