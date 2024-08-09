import { Button } from 'antd';

const BCButton = ({ children, ...props }) => {
	return <Button {...props}>{children}</Button>;
};

export default BCButton;
