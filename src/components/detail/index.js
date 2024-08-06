import { useState } from 'react';
import { Form } from 'antd';
import BCTree from '@/commons/components/tree';
import { initialData } from '@/data/detailData';
import DetailDrawer from './DetailDrawer';

const DetailPage = () => {
	const [treeData, setTreeData] = useState(initialData);
	const [isDrawerVisible, setisDrawerVisible] = useState(false);
	const [selectedKey, setSelectedKey] = useState(null);
	const [form] = Form.useForm();

	const onDrop = info => {
		console.log('drop', info);
		const dropKey = info.node.key;
		const dragKey = info.dragNode.key;
		const dropPos = info.node.pos.split('-');
		const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

		const loop = (data, key, callback) => {
			data.forEach((item, index, arr) => {
				if (item.key === key) {
					return callback(item, index, arr);
				}
				if (item.children) {
					return loop(item.children, key, callback);
				}
			});
		};
		const data = [...treeData];

		let dragObj;
		loop(data, dragKey, (item, index, arr) => {
			arr.splice(index, 1);
			dragObj = item;
		});

		if (!info.dropToGap) {
			loop(data, dropKey, item => {
				item.children = item.children || [];
				item.children.push(dragObj);
			});
		} else if (
			(info.node.children || []).length > 0 &&
			info.node.expanded &&
			dropPosition === 1
		) {
			loop(data, dropKey, item => {
				item.children = item.children || [];
				item.children.unshift(dragObj);
			});
		} else {
			let ar;
			let i;
			loop(data, dropKey, (item, index, arr) => {
				ar = arr;
				i = index;
			});
			if (dropPosition === -1) {
				ar.splice(i, 0, dragObj);
			} else {
				ar.splice(i + 1, 0, dragObj);
			}
		}

		setTreeData(data);
	};

	const addNode = (key, newNodeTitle) => {
		const newNode = { title: newNodeTitle, key: `${key}-${Date.now()}` };
		const updateTreeData = (list, key, children) => {
			return list.map(node => {
				if (node.key === key) {
					return { ...node, children };
				}
				if (node.children) {
					return { ...node, children: updateTreeData(node.children, key, children) };
				}
				return node;
			});
		};

		const updatedTreeData = updateTreeData(treeData, key, [
			...(findNode(treeData, key).children || []),
			newNode
		]);
		setTreeData(updatedTreeData);
	};

	const findNode = (list, key) => {
		for (let node of list) {
			if (node.key === key) return node;
			if (node.children) {
				const found = findNode(node.children, key);
				if (found) return found;
			}
		}
		return null;
	};

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

	return (
		<div>
			<h1>Detail Page</h1>
			<BCTree
				className="draggable-tree"
				draggable
				blockNode
				onDrop={onDrop}
				treeData={treeData}
				onSelect={onSelect}
				defaultExpandAll
			/>
			<DetailDrawer
				isOpen={isDrawerVisible}
				onClose={handleClose}
				onAddNode={title => addNode(selectedKey, title)}
				form={form}
			/>
		</div>
	);
};

export default DetailPage;
