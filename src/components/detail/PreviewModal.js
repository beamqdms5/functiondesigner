import React from 'react';
import { Modal, Form, Tabs, Row, Col, DatePicker, Checkbox, Table } from 'antd';

import BCInput from '@/commons/components/input';
import BCAutoComplete from '@/commons/components/autoComplete';
import BCButton from '@/commons/components/button';
import BCInputNumber from '@/commons/components/number';
import BCSelect from '@/commons/components/select';
import BCTextArea from '@/commons/components/textarea';
import BCTree from '@/commons/components/tree';

const { TabPane } = Tabs;

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
					<Checkbox />
				</Form.Item>
			);
		case 'tabs':
			return (
				<Form.Item
					label={node.title}
					key={node.key}
				>
					<Tabs>
						{node.children &&
							node.children.map(child => (
								<TabPane
									tab={child.title}
									key={child.key}
								>
									{child.children &&
										child.children.map(grandChild =>
											renderFormItem(grandChild)
										)}
								</TabPane>
							))}
					</Tabs>
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
					<Table
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

const renderColumn = column => (
	<Col
		span={12}
		key={column.key}
		className="my-3"
	>
		<Form layout="vertical">
			{column.children && column.children.map(child => renderFormItem(child))}
		</Form>
	</Col>
);

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
			<Row gutter={16}>{columns.map(column => renderColumn(column))}</Row>
		</Modal>
	);
};

export default PreviewModal;
