import { v4 as uuidv4 } from 'uuid';
import { allowedChildTypes } from '@/data/detailData';

export const loop = (data, key, callback) => {
	data.forEach((item, index, arr) => {
		if (item.key === key) {
			return callback(item, index, arr);
		}
		if (item.children) {
			return loop(item.children, key, callback);
		}
	});
};

export const findNode = (list, key) => {
	for (let node of list) {
		if (node.key === key) return node;
		if (node.children) {
			const found = findNode(node.children, key);
			if (found) return found;
		}
	}
	return null;
};

export const onDrop = (targetItem, draggedItem, treeData, setTreeData) => {
	const data = [...treeData];
	let dragObj = null;

	const isAllowed = allowedChildTypes[targetItem.type]?.includes(draggedItem.type);

	const findAndRemoveNode = (nodes, key) => {
		for (let i = 0; i < nodes.length; i++) {
			if (nodes[i].key === key) {
				dragObj = nodes[i];
				nodes.splice(i, 1);
				return;
			} else if (nodes[i].children) {
				findAndRemoveNode(nodes[i].children, key);
			}
		}
	};

	if (isAllowed) {
		findAndRemoveNode(data, draggedItem.key);

		const addNodeToTarget = (nodes, targetKey, dragObj) => {
			return nodes.map(node => {
				if (node.key === targetKey) {
					return {
						...node,
						children: [...(node.children || []), dragObj]
					};
				} else if (node.children) {
					return {
						...node,
						children: addNodeToTarget(node.children, targetKey, dragObj)
					};
				}
				return node;
			});
		};

		const updatedTreeData = addNodeToTarget(data, targetItem.key, dragObj);
		setTreeData(updatedTreeData);
	} else {
		setTreeData(data);
	}
};

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

export const handleAddNode = (
	values,
	treeData,
	setTreeData,
	drawerType,
	selectedNode,
	setSelectedNode,
	setSelectedColumn,
	setParentType
) => {
	const { column, ...newNode } = values;
	newNode.key = uuidv4();

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

export const handleUpdateNode = (values, treeData, setTreeData, setSelectedNode) => {
	const updatedValues = { ...values };
	updateNode(updatedValues, treeData, setTreeData);
	setSelectedNode(null);
};

export const updateNode = (values, treeData, setTreeData) => {
	const data = [...treeData];
	loop(data, values.key, (item, index, arr) => {
		arr[index] = { ...item, ...values };
	});
	setTreeData(data);
};
