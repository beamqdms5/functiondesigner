import { useState } from 'react';
import { Form, Button } from 'antd';
import BCTree from '@/commons/components/tree';
import { initialData } from '@/data/detailData';
import DetailDrawer from './DetailDrawer';
import { onDrop, addNode, findNode } from './functions/helper';

const DetailPage = () => {
	const [treeData, setTreeData] = useState(initialData);
	const [isDrawerVisible, setisDrawerVisible] = useState(false);
	const [selectedKey, setSelectedKey] = useState(null);
	const [form] = Form.useForm();

	const handleDrop = info => onDrop(info, treeData, setTreeData);

	const handleAddNode = values => addNode(values, treeData, setTreeData);

	const showModal = key => {
		setSelectedKey(key);
		setisDrawerVisible(true);
	};

	const handleClose = () => {
		setisDrawerVisible(false);
		form.resetFields();
	};

	const onSelect = (keys, event) => {
		if (event.node) {
			showModal(event.node.key);
		}
	};

	const handleAddButtonClick = () => {
		setSelectedKey(null);
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
				onSelect={onSelect}
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
