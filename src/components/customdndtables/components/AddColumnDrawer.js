import { BCButton, BCCheckbox, BCDrawer, BCForm, BCInput } from '@/commons/components';
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

	const formItems = [
		{
			label: 'Column Header',
			name: 'header',
			rules: [{ required: true, message: 'Please enter the column header' }],
			component: <BCInput placeholder="Enter column header" />
		},
		{
			label: 'Column Name',
			name: 'name',
			rules: [{ required: true, message: 'Please enter the column name' }],
			component: <BCInput placeholder="Enter column name" />
		},
		{
			label: 'Primary Key?',
			name: 'isPrimaryKey',
			valuePropName: 'checked',
			component: <BCCheckbox>Primary Key</BCCheckbox>
		}
	];

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
			<BCForm
				form={form}
				name="add_column_form"
				layout="vertical"
				initialValues={{ isPrimaryKey: false }}
				formItems={formItems}
			/>
		</BCDrawer>
	);
};

export default AddColumnDrawer;
