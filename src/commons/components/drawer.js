import { Drawer } from 'antd';

const BCDrawer = ({ title, onClose, children, ...props }) => {
	return (
		<Drawer
			title={title}
			onClose={onClose}
			{...props}
		>
			{children}
		</Drawer>
	);
};

export default BCDrawer;