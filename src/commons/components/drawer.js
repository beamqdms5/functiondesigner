import { Drawer } from 'antd';

const BCDrawer = ({ children, ...props }) => {
	return <Drawer {...props}>{children}</Drawer>;
};

export default BCDrawer;
