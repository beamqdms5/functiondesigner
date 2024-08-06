import { useState } from 'react';
import { Form, Button } from 'antd';
import BCTree from '@/commons/components/tree';
import { initialData } from '@/data/detailData';
import DetailDrawer from './DetailDrawer';
import { onDrop, addNode, updateNode, findNode } from './functions/helper';

const DetailPage = () => {
	const [treeData, setTreeData] = useState(initialData);
	const [isDrawerVisible, setisDrawerVisible] = useState(false);
	const [selectedNode, setSelectedNode] = useState(null);
	const [form] = Form.useForm();

	const handleDrop = info => onDrop(info, treeData, setTreeData);

	const handleAddNode = values => {
		if (selectedNode) {
			const updatedValues = { ...selectedNode, ...values };
			updateNode(updatedValues, treeData, setTreeData);
		} else {
			addNode(values, treeData, setTreeData);
		}
		setSelectedNode(null);
	};

	const showDrawer = key => {
		const node = findNode(treeData, key);
		setSelectedNode(node);
		form.setFieldsValue(node);
		setisDrawerVisible(true);
	};

	const handleClose = () => {
		setisDrawerVisible(false);
		form.resetFields();
	};

	const handleAddButtonClick = () => {
		setSelectedNode(null);
		form.resetFields();
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
				Add Node
			</Button>
			<BCTree
				className="draggable-tree"
				draggable
				blockNode
				onDrop={handleDrop}
				treeData={treeData}
				onSelect={(keys, event) => showDrawer(event.node.key)}
				defaultExpandAll
			/>
			<DetailDrawer
				isOpen={isDrawerVisible}
				onClose={handleClose}
				onAddNode={handleAddNode}
				form={form}
				selectedNode={selectedNode}
			/>
		</div>
	);
};

export default DetailPage;
