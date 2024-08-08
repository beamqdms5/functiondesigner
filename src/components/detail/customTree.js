import { useDrag, useDrop } from 'react-dnd';
import { BCButton, BCTree, Tree } from '@/commons/components';
import { PlusOutlined } from '@ant-design/icons';

const { TreeNode } = Tree;

const ItemType = 'TREE_NODE';

const TreeNodeComponent = ({ item, onTitleClick, onButtonClick, handleDrop }) => {
	const [, ref] = useDrag({
		type: ItemType,
		item: { ...item }
	});

	const [, drop] = useDrop({
		accept: ItemType,
		drop: draggedItem => handleDrop(item, draggedItem)
	});

	const isColumnType =
		item.type.startsWith('group') ||
		item.type.startsWith('tabs') ||
		item.type.startsWith('tab') ||
		item.type.startsWith('grid') ||
		item.type.startsWith('column');

	const isGridColumn = item.type === 'gridColumn';

	return (
		<div ref={node => ref(drop(node))}>
			<span onClick={() => onTitleClick(item)}>{item.title}</span>
			{isColumnType && !isGridColumn && (
				<BCButton
					type="text"
					size="small"
					shape="circle"
					icon={<PlusOutlined />}
					onClick={e => {
						e.stopPropagation();
						onButtonClick(item);
					}}
					style={{ marginLeft: 8 }}
				/>
			)}
		</div>
	);
};

const CustomTree = ({ data, onTitleClick, onButtonClick, handleDrop }) => {
	const renderTreeNodes = data =>
		data.map(item => (
			<TreeNode
				title={
					<TreeNodeComponent
						item={item}
						onTitleClick={onTitleClick}
						onButtonClick={onButtonClick}
						handleDrop={handleDrop}
					/>
				}
				key={item.key}
			>
				{item.children ? renderTreeNodes(item.children) : null}
			</TreeNode>
		));

	return (
		<BCTree
			defaultExpandAll
			blockNode
		>
			{renderTreeNodes(data)}
		</BCTree>
	);
};

export default CustomTree;
