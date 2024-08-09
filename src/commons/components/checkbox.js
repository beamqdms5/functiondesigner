import { Checkbox } from 'antd';

const BCCheckbox = ({ children, ...props }) => {
	return <Checkbox {...props}>{children}</Checkbox>;
};

export default BCCheckbox;
