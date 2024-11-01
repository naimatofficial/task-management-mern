import { Table, Pagination } from "antd";
import PropTypes from "prop-types";

const DataTable = ({ data, columns, current, setCurrent, pageSize }) => {
	const handlePaginationChange = (page) => {
		setCurrent(page);
	};

	const startIndex = (current - 1) * pageSize;
	const paginatedData = data.slice(startIndex, startIndex + pageSize);

	return (
		<>
			<div className="overflow-x-auto">
				<Table
					dataSource={paginatedData}
					columns={columns}
					rowKey={(record) => record._id}
					pagination={false}
					sticky
					virtual
					className="w-full text-sm sm:text-base"
				/>
			</div>
			<Pagination
				current={current}
				pageSize={pageSize}
				total={data.length}
				onChange={handlePaginationChange}
				style={{ marginTop: 16, textAlign: "right" }}
			/>
		</>
	);
};

// Define PropTypes for the DataTable component
DataTable.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	onEdit: PropTypes.func,
	setCurrent: PropTypes.func.isRequired,
	current: PropTypes.number,
	pageSize: PropTypes.number,
};

export default DataTable;
