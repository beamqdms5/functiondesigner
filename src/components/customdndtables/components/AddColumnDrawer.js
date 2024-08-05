import React from 'react';
import { Drawer, Form, Button, Input, Checkbox } from 'antd';
import BCInput from '@/commons/components/input';

const AddColumnDrawer = ({ open, onClose, onAddColumn }) => {
	const [form] = Form.useForm();

	const handleAddColumn = () => {
		form.validateFields()
			.then(values => {
				form.resetFields();
				onAddColumn(values);
				onClose();
			})
			.catch(info => {
				console.log('Validate Failed:', info);
			});
	};

	return (
		<Drawer
			title="Add New Column"
			width={360}
			onClose={onClose}
			open={open}
			footer={
				<div
					style={{
						textAlign: 'right'
					}}
				>
					<Button
						onClick={onClose}
						style={{ marginRight: 8 }}
					>
						Cancel
					</Button>
					<Button
						onClick={handleAddColumn}
						type="primary"
					>
						Add
					</Button>
				</div>
			}
		>
			<Form
				form={form}
				layout="vertical"
				name="add_column_form"
			>
				<Form.Item
					name="header"
					label="Column Header"
					rules={[{ required: true, message: 'Please enter the column header' }]}
				>
					<BCInput placeholder="Enter column header" />
				</Form.Item>
				<Form.Item
					name="name"
					label="Column Name"
					rules={[{ required: true, message: 'Please enter the column name' }]}
				>
					<BCInput placeholder="Enter column name" />
				</Form.Item>
			</Form>
		</Drawer>
	);
};

export default AddColumnDrawer;
