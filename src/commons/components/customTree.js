import React from 'react';
import { Tree, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TreeNode } = Tree;

const CustomTree = ({ data, onTitleClick, onButtonClick }) => {
	const renderTreeNodes = data =>
		data.map(item => (
			<TreeNode
				title={
					<span>
						<span onClick={() => onTitleClick(item)}>{item.title}</span>
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
					</span>
				}
				key={item.key}
			>
				{item.children ? renderTreeNodes(item.children) : null}
			</TreeNode>
		));

	return <Tree defaultExpandAll>{renderTreeNodes(data)}</Tree>;
};

export default CustomTree;
