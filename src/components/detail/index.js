import { initialData } from '@/data/detailData';
import { Button, Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CustomTree from './customTree';
import DetailDrawerAdd from './DetailDrawerAdd';
import DetailDrawerUpdate from './DetailDrawerUpdate';
import { onDrop, updateNode } from './functions/helper';
import PreviewModal from './PreviewModal';

const DetailPage = () => {
	const [treeData, setTreeData] = useState(initialData);
	const [isDrawerVisible, setisDrawerVisible] = useState(false);
	const [isPreviewVisible, setIsPreviewVisible] = useState(false);
	const [selectedNode, setSelectedNode] = useState(null);
	const [form] = Form.useForm();
	const [drawerType, setDrawerType] = useState(null);
	const [selectedColumn, setSelectedColumn] = useState(null);
	const [parentType, setParentType] = useState(null);

	useEffect(() => {
		console.log(treeData);
	}, [treeData]);

	const handleDrop = info => onDrop(info, treeData, setTreeData);

	const handleAddNode = values => {
		const { column, ...newNode } = values;
		newNode.key = uuidv4();

		const addNodeRecursively = (nodes, targetKey, newNode) => {
			return nodes.map(node => {
				if (node.key === targetKey) {
					return {
						...node,
						children: [...(node.children || []), newNode]
					};
				} else if (node.children) {
					return {
						...node,
						children: addNodeRecursively(node.children, targetKey, newNode)
					};
				}
				return node;
			});
		};

		if (drawerType === 'add' && selectedNode) {
			const updatedTreeData = addNodeRecursively(treeData, selectedNode.key, newNode);
			setTreeData(updatedTreeData);
		} else {
			const updatedTreeData = treeData.map(node => {
				if (node.name === column) {
					return {
						...node,
						children: [...(node.children || []), newNode]
					};
				}
				return node;
			});
			setTreeData(updatedTreeData);
		}

		setSelectedNode(null);
		setSelectedColumn(null);
		setParentType(null);
	};

	const handleUpdateNode = values => {
		const updatedValues = { ...selectedNode, ...values };
		updateNode(updatedValues, treeData, setTreeData);
		setSelectedNode(null);
	};

	const showDrawerAdd = node => {
		setSelectedNode(node);
		setDrawerType('add');
		setSelectedColumn(node?.name || null);
		setParentType(node?.type || null);
		form.resetFields();
		setisDrawerVisible(true);
	};

	const showDrawerUpdate = node => {
		setSelectedNode(node);
		setDrawerType('update');
		form.setFieldsValue(node);
		setisDrawerVisible(true);
	};

	const handleClose = () => {
		setisDrawerVisible(false);
		form.resetFields();
		setSelectedNode(null);
		setDrawerType(null);
		setSelectedColumn(null);
		setParentType(null);
	};

	const handleAddButtonClick = () => {
		setSelectedNode(null);
		setDrawerType('add');
		setSelectedColumn(null);
		setParentType('column');
		form.resetFields();
		setisDrawerVisible(true);
	};

	const handleTitleClick = node => {
		if (!node.type.includes('column')) {
			showDrawerUpdate(node);
		}
	};

	const handleButtonClick = node => {
		showDrawerAdd(node);
	};

	const handlePreviewButtonClick = () => {
		setIsPreviewVisible(true);
	};

	const handlePreviewClose = () => {
		setIsPreviewVisible(false);
	};

	return (
		<div>
			<h1>Detail Page</h1>
			<Button
				type="dashed"
				onClick={handleAddButtonClick}
				style={{ marginBottom: 16 }}
			>
				Add Field
			</Button>
			<Button
				type="primary"
				onClick={handlePreviewButtonClick}
				style={{ marginBottom: 16, marginLeft: 8 }}
			>
				Preview
			</Button>
			<Row gutter={16}>
				<Col span={12}>
					<CustomTree
						data={treeData.filter(node => node.name === 'column1')}
						onTitleClick={handleTitleClick}
						onButtonClick={handleButtonClick}
					/>
				</Col>
				<Col span={12}>
					<CustomTree
						data={treeData.filter(node => node.name === 'column2')}
						onTitleClick={handleTitleClick}
						onButtonClick={handleButtonClick}
					/>
				</Col>
			</Row>
			{drawerType === 'add' && (
				<DetailDrawerAdd
					isOpen={isDrawerVisible}
					onClose={handleClose}
					onAddNode={handleAddNode}
					form={form}
					selectedColumn={selectedColumn}
					parentType={parentType}
				/>
			)}
			{drawerType === 'update' && (
				<DetailDrawerUpdate
					isOpen={isDrawerVisible}
					onClose={handleClose}
					onUpdateNode={handleUpdateNode}
					form={form}
					selectedNode={selectedNode}
				/>
			)}
			<PreviewModal
				visible={isPreviewVisible}
				onClose={handlePreviewClose}
				treeData={treeData}
			/>
		</div>
	);
};

export default DetailPage;
