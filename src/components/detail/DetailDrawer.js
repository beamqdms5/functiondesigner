import { Drawer, Form } from 'antd';
import BCInput from '@/commons/components/input';
import BCButton from '@/commons/components/button';
import BCSelect from '@/commons/components/select';

const typeOptions = [
	{
		value: 'column',
		label: 'Column'
	},
	{
		value: 'text',
		label: 'Text'
	},
	{
		value: 'number',
		label: 'Number'
	},
	{
		value: 'boolean',
		label: 'Boolean'
	},
	{
		value: 'date',
		label: 'Date'
	},
	{
		value: 'select',
		label: 'Select'
	},
	{
		value: 'file',
		label: 'File'
	}
];

const DetailDrawer = ({ isOpen, onClose, onAddNode, form, selectedNode }) => {
	const handleOk = () => {
		form.validateFields().then(values => {
			onAddNode(values);
			onClose();
			form.resetFields();
		});
	};

	return (
		<Drawer
			title="Add Field"
			open={isOpen}
			onClose={onClose}
			width={320}
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
						onClick={handleOk}
						type="primary"
					>
						{selectedNode ? 'Update' : 'Add'}
					</BCButton>
				</div>
			}
		>
			<Form
				form={form}
				layout="vertical"
				name="addNodeForm"
			>
				<Form.Item
					name="title"
					label="Title"
					rules={[{ required: true, message: 'Please enter the title!' }]}
				>
					<BCInput />
				</Form.Item>
				<Form.Item
					name="name"
					label="Name"
					rules={[{ required: true, message: 'Please enter the name!' }]}
				>
					<BCInput />
				</Form.Item>
				<Form.Item
					name="type"
					label="Type"
					rules={[{ required: true, message: 'Please select the field type' }]}
				>
					<BCSelect
						placeholder="Select type"
						options={typeOptions}
					/>
				</Form.Item>
			</Form>
		</Drawer>
	);
};

export default DetailDrawer;
