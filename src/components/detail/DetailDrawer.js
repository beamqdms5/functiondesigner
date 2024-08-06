import { Drawer, Form } from 'antd';
import BCInput from '@/commons/components/input';
import BCButton from '@/commons/components/button';

const DetailDrawer = ({ isOpen, onClose, onAddNode, form }) => {
	const handleOk = () => {
		form.validateFields().then(values => {
			onAddNode(values.title);
			onClose();
			form.resetFields();
		});
	};

	return (
		<Drawer
			title="Add Node"
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
				<Form.Item
					name="title"
					label="Title"
					rules={[{ required: true, message: 'Please input the title!' }]}
				>
					<BCInput />
				</Form.Item>
			</Form>
		</Drawer>
	);
};

export default DetailDrawer;
