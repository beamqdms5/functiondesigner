import { useState, useEffect } from 'react';
import { Drawer, Form } from 'antd';
import BCInput from '@/commons/components/input';
import BCButton from '@/commons/components/button';
import BCSelect from '@/commons/components/select';

const typeOptions = [
	{ value: 'text', label: 'Text' },
	{ value: 'number', label: 'Number' },
	{ value: 'boolean', label: 'Boolean' },
	{ value: 'date', label: 'Date' },
	{ value: 'select', label: 'Select' },
	{ value: 'file', label: 'File' },
	{ value: 'group', label: 'Group' },
	{ value: 'tabs', label: 'Tabs' },
	{ value: 'grid', label: 'Grid' },
	{ value: 'tab', label: 'Tab' },
	{ value: 'gridcolumn', label: 'Grid Column' }
];

const allowedChildTypes = {
	column: ['text', 'number', 'boolean', 'date', 'select', 'file', 'group', 'grid', 'tabs'],
	tabs: ['tab'],
	tab: ['text', 'number', 'boolean', 'date', 'select', 'file', 'group', 'grid'],
	group: ['text', 'number', 'boolean', 'date', 'select', 'file'],
	grid: ['gridcolumn']
};

const DetailDrawerAdd = ({ isOpen, onClose, onAddNode, form, selectedColumn, parentType }) => {
	const [columnSelected, setColumnSelected] = useState(selectedColumn);

	useEffect(() => {
		if (selectedColumn) {
			form.setFieldsValue({ column: selectedColumn });
			setColumnSelected(selectedColumn);
		} else {
			form.resetFields();
			setColumnSelected(null);
		}
	}, [selectedColumn, form]);

	const handleOk = () => {
		form.validateFields().then(values => {
			onAddNode({ ...values, column: columnSelected });
			onClose();
			form.resetFields();
			setColumnSelected(null);
		});
	};

	const handleColumnChange = value => {
		parentType = value;
		setColumnSelected(value);
		form.setFieldsValue({ column: value });
	};

	return (
		<Drawer
			title="Add Field"
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
						Add
					</BCButton>
				</div>
			}
		>
			<Form
				form={form}
				layout="vertical"
				name="addNodeForm"
			>
				{!selectedColumn && (
					<Form.Item
						name="column"
						label="Select Column"
						rules={[{ required: true, message: 'Please select the column!' }]}
					>
						<BCSelect
							placeholder="Select column"
							options={[
								{ value: 'column1', label: 'Column 1' },
								{ value: 'column2', label: 'Column 2' }
							]}
							onChange={handleColumnChange}
						/>
					</Form.Item>
				)}
				{columnSelected && (
					<>
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
								options={
									allowedChildTypes[parentType]
										? allowedChildTypes[parentType].map(type =>
												typeOptions.find(option => option.value === type)
											)
										: typeOptions
								}
							/>
						</Form.Item>
					</>
				)}
			</Form>
		</Drawer>
	);
};

export default DetailDrawerAdd;
