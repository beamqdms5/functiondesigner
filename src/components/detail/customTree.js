import React from 'react';
import { Tree, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TreeNode } = Tree;

const CustomTree = ({ data, onTitleClick, onButtonClick }) => {
	const renderTreeNodes = data =>
		data.map(item => {
			const isColumnType =
				item.type.startsWith('group') ||
				item.type.startsWith('tabs') ||
				item.type.startsWith('tab') ||
				item.type.startsWith('grid') ||
				item.type.startsWith('column');

			const isGridColumn = item.type === 'gridColumn';

			return (
				<TreeNode
					title={
						<span>
							<span onClick={() => onTitleClick(item)}>{item.title}</span>
							{isColumnType && !isGridColumn && (
								<Button
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
						</span>
					}
					key={item.key}
				>
					{item.children ? renderTreeNodes(item.children) : null}
				</TreeNode>
			);
		});

	return <Tree defaultExpandAll>{renderTreeNodes(data)}</Tree>;
};

export default CustomTree;
