import { useState } from 'react';
import { Form, Button } from 'antd';
import BCTree from '@/commons/components/tree';
import { initialData } from '@/data/detailData';
import DetailDrawer from './DetailDrawer';
import { onDrop, addNode } from './functions/helper';

const DetailPage = () => {
	const [treeData, setTreeData] = useState(initialData);
	const [isDrawerVisible, setisDrawerVisible] = useState(false);
	const [form] = Form.useForm();

	const handleDrop = info => onDrop(info, treeData, setTreeData);

	const handleAddNode = values => addNode(values, treeData, setTreeData);

	const showModal = () => {
		setisDrawerVisible(true);
	};

	const handleClose = () => {
		setisDrawerVisible(false);
		form.resetFields();
	};

	const handleAddButtonClick = () => {
		setisDrawerVisible(true);
	};

	return (
		<div>
			<h1>Detail Page</h1>
			<Button
				type="primary"
				onClick={handleAddButtonClick}
				style={{ marginBottom: 16 }}
			>
				Add Field
			</Button>
			<BCTree
				className="draggable-tree"
				draggable
				blockNode
				onDrop={handleDrop}
				treeData={treeData}
				onSelect={showModal}
				defaultExpandAll
			/>
			<DetailDrawer
				isOpen={isDrawerVisible}
				onClose={handleClose}
				onAddNode={handleAddNode}
				form={form}
			/>
		</div>
	);
};

export default DetailPage;
