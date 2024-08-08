import { Table } from 'antd';

const BCTable = ({ columns, dataSource, pagination, ...props }) => {
	return (
		<Table
			columns={columns}
			dataSource={dataSource}
			pagination={pagination}
			{...props}
		/>
	);
};

export default BCTable;
