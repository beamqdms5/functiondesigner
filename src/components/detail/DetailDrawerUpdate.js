import { BCButton, BCDrawer, BCForm, BCInput, BCSelect } from '@/commons/components';
import { useEffect } from 'react';

const typeOptions = [
	{ value: 'text', label: 'Text' },
	{ value: 'number', label: 'Number' },
	{ value: 'boolean', label: 'Boolean' },
	{ value: 'date', label: 'Date' },
	{ value: 'select', label: 'Select' },
	{ value: 'file', label: 'File' },
	{ value: 'group', label: 'Group' },
	{ value: 'tabs', label: 'Tabs' },
	{ value: 'grid', label: 'Grid' }
];

const DetailDrawerUpdate = ({ isOpen, onClose, onUpdateNode, form, selectedNode }) => {
	useEffect(() => {
		if (selectedNode) {
			form.setFieldsValue(selectedNode);
		}
	}, [selectedNode, form]);

	const handleOk = () => {
		form.validateFields().then(values => {
			onUpdateNode({ ...selectedNode, ...values });
			onClose();
			form.resetFields();
		});
	};

	const formItems = [
		{
			label: 'Title',
			name: 'title',
			rules: [{ required: true, message: 'Please enter the title!' }],
			component: <BCInput />
		},
		{
			label: 'Name',
			name: 'name',
			rules: [{ required: true, message: 'Please enter the name!' }],
			component: <BCInput />
		},
		{
			label: 'Type',
			name: 'type',
			rules: [{ required: true, message: 'Please select the field type' }],
			component: (
				<BCSelect
					placeholder="Select type"
					options={typeOptions}
				/>
			)
		}
	];

	return (
		<BCDrawer
			title="Update Field"
			open={isOpen}
			onClose={onClose}
			width={320}
			footer={
				<div style={{ textAlign: 'right' }}>
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
						Update
					</BCButton>
				</div>
			}
		>
			<BCForm
				form={form}
				name="updateNodeForm"
				layout="vertical"
				formItems={formItems}
			/>
		</BCDrawer>
	);
};

export default DetailDrawerUpdate;
