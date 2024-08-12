import {
	BCCheckbox,
	BCInput,
	BCInputNumber,
	BCSelect,
	BCTable,
	BCTabs
} from '@/commons/components';
import { Col, DatePicker, Form, Modal, Row } from 'antd';

const renderFormItem = node => {
	switch (node.type) {
		case 'text':
			return (
				<Form.Item
					name={node.name}
					label={node.title}
					key={node.key}
				>
					<BCInput />
				</Form.Item>
			);
		case 'number':
			return (
				<Form.Item
					name={node.name}
					label={node.title}
					key={node.key}
				>
					<BCInputNumber />
				</Form.Item>
			);
		case 'select':
			return (
				<Form.Item
					name={node.name}
					label={node.title}
					key={node.key}
				>
					<BCSelect />
				</Form.Item>
			);
		case 'date':
			return (
				<Form.Item
					name={node.name}
					label={node.title}
					key={node.key}
				>
					<DatePicker />
				</Form.Item>
			);
		case 'boolean':
			return (
				<Form.Item
					name={node.name}
					label={node.title}
					key={node.key}
					valuePropName="checked"
				>
					<BCCheckbox />
				</Form.Item>
			);
		case 'tabs':
			return (
				<Form.Item
					label={node.title}
					key={node.key}
				>
					<BCTabs
						tabs={node.children?.map(child => ({
							title: child.title,
							key: child.key,
							content: (
								<>{child.children?.map(grandChild => renderFormItem(grandChild))}</>
							)
						}))}
					/>
				</Form.Item>
			);
		case 'group':
			return (
				<Row
					gutter={16}
					key={node.key}
				>
					{node.children &&
						node.children.map(child => (
							<Col
								span={12}
								key={child.key}
							>
								{renderFormItem(child)}
							</Col>
						))}
				</Row>
			);
		case 'grid':
			return (
				<Form.Item
					label={node.title}
					key={node.key}
				>
					<BCTable
						columns={node.children?.map(child => ({
							title: child.title,
							dataIndex: child.name,
							key: child.key
						}))}
						dataSource={[]}
						pagination={false}
					/>
				</Form.Item>
			);
		default:
			return null;
	}
};

const renderColumn = (column, totalColumns) => {
	const validColCounts = totalColumns.filter(col => col.children?.length > 0).length;

	const colSpan = 24 / validColCounts;

	return (
		<Col
			span={colSpan}
			key={column.key}
			className="my-3"
		>
			<Form layout="vertical">{column.children?.map(child => renderFormItem(child))}</Form>
		</Col>
	);
};

const PreviewModal = ({ visible, onClose, treeData }) => {
	const columns = treeData.filter(node => node.type === 'column');

	return (
		<Modal
			title="Preview Form"
			open={visible}
			onCancel={onClose}
			footer={null}
			width={800}
		>
			<Row gutter={16}>{columns.map(column => renderColumn(column, columns))}</Row>
		</Modal>
	);
};

export default PreviewModal;
