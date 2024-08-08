import { Tree } from 'antd';

const BCTree = ({ treeData, onSelect, onExpand, ...props }) => {
	return (
		<Tree
			treeData={treeData}
			onSelect={onSelect}
			onExpand={onExpand}
			{...props}
		/>
	);
};

export default BCTree;

export { Tree };
