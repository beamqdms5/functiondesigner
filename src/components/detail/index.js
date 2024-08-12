import { BCButton, BCRow, Form } from '@/commons/components';
import { initialData } from '@/data/detailData';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CustomTree from './customTree';
import DetailDrawerAdd from './DetailDrawerAdd';
import DetailDrawerUpdate from './DetailDrawerUpdate';
import { handleAddNode, handleUpdateNode, onDrop } from './functions/helper';
import PreviewModal from './PreviewModal';

const DetailPage = () => {
	const [treeData, setTreeData] = useState(initialData);
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);
	const [isPreviewVisible, setIsPreviewVisible] = useState(false);
	const [selectedNode, setSelectedNode] = useState(null);
	const [form] = Form.useForm();
	const [drawerType, setDrawerType] = useState(null);
	const [selectedColumn, setSelectedColumn] = useState(null);
	const [parentType, setParentType] = useState(null);

	const handleDrop = (targetItem, draggedItem) => {
		onDrop(targetItem, draggedItem, treeData, setTreeData);
	};

	const onAddNode = values => {
		handleAddNode(
			values,
			treeData,
			setTreeData,
			drawerType,
			selectedNode,
			setSelectedNode,
			setSelectedColumn,
			setParentType
		);
	};

	const onUpdateNode = values => {
		handleUpdateNode(values, treeData, setTreeData, setSelectedNode);
	};

	const showDrawerAdd = node => {
		setSelectedNode(node);
		setDrawerType('add');
		setSelectedColumn(node?.name || null);
		setParentType(node?.type || null);
		form.resetFields();
		setIsDrawerVisible(true);
	};

	const showDrawerUpdate = node => {
		setSelectedNode(node);
		setDrawerType('update');
		form.setFieldsValue(node);
		setIsDrawerVisible(true);
	};

	const handleClose = () => {
		setIsDrawerVisible(false);
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
		setIsDrawerVisible(true);
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

	const columns = [
		{
			span: 12,
			content: (
				<CustomTree
					data={treeData.filter(node => node.name === 'column1')}
					onTitleClick={handleTitleClick}
					onButtonClick={handleButtonClick}
					handleDrop={(targetItem, draggedItem) => handleDrop(targetItem, draggedItem)}
				/>
			)
		},
		{
			span: 12,
			content: (
				<CustomTree
					data={treeData.filter(node => node.name === 'column2')}
					onTitleClick={handleTitleClick}
					onButtonClick={handleButtonClick}
					handleDrop={(targetItem, draggedItem) => handleDrop(targetItem, draggedItem)}
				/>
			)
		}
	];

	return (
		<DndProvider backend={HTML5Backend}>
			<div>
				<h1>Detail Page</h1>
				<BCButton
					type="dashed"
					onClick={handleAddButtonClick}
					style={{ marginBottom: 16 }}
				>
					Add Field
				</BCButton>
				<BCButton
					type="primary"
					onClick={handlePreviewButtonClick}
					style={{ marginBottom: 16, marginLeft: 8 }}
				>
					Preview
				</BCButton>
				<BCRow
					columns={columns}
					gutter={16}
				/>
				{drawerType === 'add' && (
					<DetailDrawerAdd
						isOpen={isDrawerVisible}
						onClose={handleClose}
						onAddNode={onAddNode}
						form={form}
						selectedColumn={selectedColumn}
						parentType={parentType}
					/>
				)}
				{drawerType === 'update' && (
					<DetailDrawerUpdate
						isOpen={isDrawerVisible}
						onClose={handleClose}
						onUpdateNode={onUpdateNode}
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
		</DndProvider>
	);
};

export default DetailPage;
