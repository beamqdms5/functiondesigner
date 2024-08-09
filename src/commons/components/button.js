import { Button } from 'antd';

const BCButton = ({ ...props }) => {
	return <Button {...props}>{props.children}</Button>;
};

export default BCButton;
