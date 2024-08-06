import { v4 as uuidv4 } from 'uuid';

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

export const onDrop = (info, treeData, setTreeData) => {
	const dropKey = info.node.key;
	const dragKey = info.dragNode.key;
	const dropPos = info.node.pos.split('-');
	const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

	const data = [...treeData];
	let dragObj;

	loop(data, dragKey, (item, index, arr) => {
		arr.splice(index, 1);
		dragObj = item;
	});

	const dropNode = findNode(data, dropKey);

	if (!info.dropToGap) {
		if (dropNode.type.startsWith('column')) {
			loop(data, dropKey, item => {
				item.children = item.children || [];
				item.children.push(dragObj);
			});
		} else {
			data.push(dragObj);
		}
	} else if ((info.node.children || []).length > 0 && info.node.expanded && dropPosition === 1) {
		if (dropNode.type.startsWith('column')) {
			loop(data, dropKey, item => {
				item.children = item.children || [];
				item.children.unshift(dragObj);
			});
		} else {
			data.push(dragObj);
		}
	} else {
		let ar;
		let i;
		loop(data, dropKey, (item, index, arr) => {
			ar = arr;
			i = index;
		});
		if (dropNode.type.startsWith('column')) {
			if (dropPosition === -1) {
				ar.splice(i, 0, dragObj);
			} else {
				ar.splice(i + 1, 0, dragObj);
			}
		} else {
			data.push(dragObj);
		}
	}

	setTreeData(data);
};

export const addNode = (values, treeData, setTreeData) => {
	const newNode = {
		key: uuidv4(),
		title: values.title,
		type: values.type,
		name: values.name
	};
	const data = [...treeData, newNode];
	setTreeData(data);
	console.log(newNode);
};

export const updateNode = (values, treeData, setTreeData) => {
	const data = [...treeData];
	loop(data, values.key, (item, index, arr) => {
		arr[index] = { ...item, ...values };
	});
	setTreeData(data);
};
