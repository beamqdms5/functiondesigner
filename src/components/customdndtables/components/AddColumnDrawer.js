import { BCButton, BCCheckbox, BCDrawer, BCInput } from '@/commons/components';
import { Form } from 'antd';

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
		<BCDrawer
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
					<BCButton
						onClick={onClose}
						style={{ marginRight: 8 }}
					>
						Cancel
					</BCButton>
					<BCButton
						onClick={handleAddColumn}
						type="primary"
					>
						Add
					</BCButton>
				</div>
			}
		>
			<Form
				form={form}
				layout="vertical"
				name="add_column_form"
				initialValues={{ isPrimaryKey: false }}
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
				<Form.Item
					name="isPrimaryKey"
					label="Primary Key?"
					valuePropName="checked"
				>
					<BCCheckbox>Primary Key</BCCheckbox>
				</Form.Item>
			</Form>
		</BCDrawer>
	);
};

export default AddColumnDrawer;
